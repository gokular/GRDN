const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const { Garden, User, Produce } = require('../models');
const { isAuthenticated } = require('../middleware/auth');
require('dotenv').config();

router.put('/', isAuthenticated, async (req, res, next) => {
    // {address, name, phone, bio}

    var address = req.body.address;
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`;

    // Get latitude and longitude from address
    await fetch(url)
        .then(res => res.json())
        .then(json => {
            req.body["longitude"] = json.results[0].geometry.bounds.northeast.lng;
            req.body["latitude"] = json.results[0].geometry.bounds.northeast.lat;
        });

    const garden = new Garden(req.body);
    garden.save()
        .then(() => {
            res.status(200).json(garden)
        }).catch(err => {
            next(err);
        });
});

router.get('/', async (req, res, next) => {
    // {radius in miles, longitude, latitude}

    // returns distance in miles
    const distance = (lat1, lon1, lat2, lon2) => {
        var p = Math.PI / 180;
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
        return Math.abs(0.621371 * 12742 * Math.asin(Math.sqrt(a)));
    }

    var miles = req.params.miles;
    var lng = req.params.longitude;
    var lat = req.params.latitude;
    var ret = [];

    Garden.find({}).toArray((err, result) => {
        for (let i = 0; i < result.size(); i++) {
            if (distance(lat, lng, result[i].latitude, result[i].longitude) <= miles) {
                ret.push(result[i]);
            }
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
    Garden.findByIdAndDelete(req.params.id).then((garden) => {
        // update user object
        const uid = garden.user;
        await User.findById(uid).then((user) => {
            const gardens = user.gardens;
            gardens.splice(gardens.indexOf(req.params.id), 1);
            user.save();
        }).catch((err) => {
            next(err);
        });
    }).catch((err) => {
        next(err);
    });
});

// add produce to a garden
router.post('/produce', isAuthenticated, async (req, res, next) => {
    // Create produce object
    new Produce(req.body).save().then((produce) => {
        Garden.findById(req.body.garden).then((garden) => {
            garden.produce.push(produce);
            garden.save();
        }).catch((err) => {
            next(err);
        });
    });
});

// delete produce from a given garden
router.delete('/produce/:id', isAuthenticated, async (req, res, next) => {
    Produce.findByIdAndDelete(req.params.id).then((produce) => {
        // update garden
        const gid = produce.garden;
        await Garden.findById(gid).then((garden) => {
            const produces = garden.produce;
            produces.splice(produces.indexOf(req.params.id), 1);
            garden.save();
        }).catch((err) => {
            next(err);
        });
    }).catch((err) => {
        next(err);
    });
});

module.exports = router;