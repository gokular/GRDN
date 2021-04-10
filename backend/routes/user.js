const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
require('dotenv').config();

router.put('/', async (req, res, next) => {
    // {email, password, name, image}
    const user = new User(req.body);
    user.save()
        .then(() => {
            res.status(200).json(user);
        }).catch(err => {
            next(err);
        });
});

router.post('/', passport.authenticate('local', { session: false }), (req, res, next) => {
    res.status(200).json({
        user: req.user.email,
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