const express = require("express");
const router = express.Router();
const register = require("../controller/registration");
const passport = require("passport");
const BearerStrategy = require('passport-http-bearer').Strategy;

const jwt = require('jsonwebtoken');
const SecretKey = 'secretKey';

// let isLoggedIn = (req, res, next) => {
//     if (!req.isAuthenticated()) {
       
       
//         res.status(401).send("You are not authorized");

//     }
//     next();

// }

passport.use(new BearerStrategy(
    function (token, done) {
        const decoded = jwt.verify(token, SecretKey);
        if (!decoded) {
            
            return done(null, false);
        }
        return done(null, decoded);
    }
));


router.route("/register")
    .get(register.renderRegister)
    .post(register.register);


router.route("/login").post(passport.authenticate('local'), register.login);
router.get('/auth', passport.authenticate('bearer', { session: false }), (req, res) => {
    
            // If the token is valid, this code will be executed
        res.status(200).json("You are authorized");
   
})



module.exports = router;