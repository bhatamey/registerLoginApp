const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema

const UserScehma= mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
});

const User = module.exports = mongoose.model('User', UserScehma);

module.exports.getUeerById = function(id, callback){

    User.findById(id, callback);
}

module.exports.getUserByUserName = function(uname, callback){
    const query = {username: uname}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err)
                throw(err);

            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) 
            throw err;
        
        callback(null, isMatch);
    });
}