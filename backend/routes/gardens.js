const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const multer = require('multer');
const upload = multer({ dest: 'assets/' });
const uploadImage = require('../helpers/helpers');
const { Garden, User, Produce } = require('../models');
const { isAuthenticated } = require('../middleware/auth');

require('dotenv').config();

router.put('/', isAuthenticated, upload.single('image'), async (req, res, next) => {
    if(req.file) {
        req.body['image'] = await uploadImage(req.file);
    }

    const address = req.body.address;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`;

    // Get latitude and longitude from address
    await fetch(url)
        .then(res => res.json())
        .then(json => {
            req.body["longitude"] = json.results[0].geometry.bounds.northeast.lng;
            req.body["latitude"] = json.results[0].geometry.bounds.northeast.lat;
        });

    const garden = new Garden(req.body);
    garden.save()
        .then(async () => {
            await User.findById(req.body.user).then((user) => {
                user.gardens.push(garden._id);
                user.save();
            });
            res.status(200).json(garden)
        }).catch(err => {
            next(err);
        });
});

router.get('/g/:miles&:longitude&:latitude', async (req, res, next) => {
    // Params
    // {radius in miles, longitude, latitude}

    // returns distance in miles
    const distance = (lat1, lon1, lat2, lon2) => {
        const p = Math.PI / 180;
        const c = Math.cos;
        const a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
        return Math.abs(0.621371 * 12742 * Math.asin(Math.sqrt(a)));
    }

    const miles = req.params.miles;
    const lng = req.params.longitude;
    const lat = req.params.latitude;
    let ret = [];

    // Lat Long
    (await Garden.find({})).forEach((garden) => {
        console.log(distance(lat, lng, garden.latitude, garden.longitude));
        if(distance(lat, lng, garden.latitude, garden.longitude) <= miles) {
            console.log(garden.address);
            ret.push(garden);      
        }
    });

    res.status(200).json({ ret });
});


router.get('/:id', async (req, res, next) => {
    Garden.findById(req.params.id).then((garden) => {
        res.status(200).json({ garden });
    }).catch((err) => {
        next(err);
    });
});

// delete garden for a given user 
router.delete('/:id', isAuthenticated, async (req, res, next) => {
    Garden.findByIdAndDelete(req.params.id).then(async (garden) => {
        // update user object
        const uid = garden.user;
        await User.findById(uid).then((user) => {
            const gardens = user.gardens;
            gardens.splice(gardens.indexOf(req.params.id), 1);
            user.save();
        }).catch((err) => {
            next(err);
        });

        // delete produce associated with garden
        await Produce.deleteMany({ garden: req.params.id }).catch((err) => {
            next(err);
        });

        res.status(200).json({ garden });
    }).catch((err) => {
        next(err);
    });
});

// add produce to a garden
router.put('/produce', isAuthenticated, upload.single('image'), async (req, res, next) => {
    if(req.file) {
        req.body['image'] = await uploadImage(req.file);
    }

    // Create produce object
    new Produce(req.body).save().then((produce) => {
        Garden.findById(req.body.garden).then((garden) => {
            garden.produce.push(produce);
            garden.save();
        }).catch((err) => {
            next(err);
        });
        res.status(200).json({ produce });
    }).catch((err) => {
        next(err);
    });
});

// delete produce from a given garden
router.delete('/produce/:id', isAuthenticated, async (req, res, next) => {
    Produce.findByIdAndDelete(req.params.id).then(async (produce) => {
        // update garden
        const gid = produce.garden;
        await Garden.findById(gid).then((garden) => {
            const produces = garden.produce;
            produces.splice(produces.indexOf(req.params.id), 1);
            garden.save();
        }).catch((err) => {
            next(err);
        });
        res.status(200).json({ produce });
    }).catch((err) => {
        next(err);
    });
});

module.exports = router;