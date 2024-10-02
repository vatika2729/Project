const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const registrationRoute = require('./routes/registration');
const passport = require('passport');
const passportLocal = require('passport-local')
const User = require('./models/user');
const express_session = require('express-session');




const app = express();





const dbUrl = "mongodb://127.0.0.1:27017"
mongoose.connect(`${dbUrl}/proctor`).then(
    () => {
        console.log("connection established");
    }
).catch((e) => {
    console.log(e);
})

const sessionConfig = {
    secret: 'thisisascreatkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(express_session(sessionConfig))


app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(User.createStrategy());


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')




app.use('/', registrationRoute);

app.listen("3000", (req, res) => {
    console.log("listening on port 3000")
})