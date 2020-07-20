const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (req, res, next) => {
    try{
        //const token = req.headers.authorization.split("JWT ")[1];
        const authorizationToken = req.headers.authorization.split("JWT")[1];
        const decodedToken = jwt.verify(authorizationToken, config.secret);
        
        req.userData = decodedToken;
        next();
    }
    catch(error){
        res.status(401).json({
            message: "Auth failed!!"
        })
    }
}