const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'assets/' });
const uploadImage = require('../helpers/helpers');

const { User } = require('../models');
require('dotenv').config();

router.put('/', upload.single('image'), async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    
    // upload image to gcs
    if (req.file) {
        req.body["image"] = await uploadImage(req.file);
    }

    console.log(req.body);

    const user = new User(req.body);
    user.save()
        .then(() => {
            res.status(200).json(user);
        }).catch(err => {
            console.log(err);
            next(err);
        });
});

router.post('/', passport.authenticate('local', { session: false }), (req, res, next) => {
    res.status(200).json({
        user: req.user.email,
        image: req.user.image,
        id: req.user._id,
        token: jwt.sign(req.user.toJSON(), process.env.SECRET_KEY)
    });
});

router.get('/:id', async (req, res, next) => {
    User.findById(req.params.id).then((user) => {
        res.status(200).json({ user });
    }).catch((err) => {
        next(err);
    });
});

module.exports = router;