var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();
var config = require('../config/database');
var User = require('../models/users');
var checkAuth = require('../config/check-auth');
const { session } = require('passport');

//Register
router.post('/register', (req, res, next) => {

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({
                success: false, 
                msg: 'Failed to register user'
            })
        }
        else{
            res.json({
                success: true, 
                msg: 'Registered user!!'
            })
        }
    })
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUserName(username, (err, user) => {
        if(err) 
            throw err;

        if(!user){
            return res.json({success: false, msg: 'USer not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) 
                throw err;

            if(isMatch){
                const token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }, config.secret, {
                    expiresIn: '1h'
                });

                res.json(
                {
                    success: true, 
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else{
                res.json({success: false, msg: 'Wrong password'});
            }
        })
    });
});

//Profile
router.get('/profile', checkAuth, (req, res, next) => {
    res.json({msg: 'Authenticated', user: req.userData});
});


module.exports  = router;