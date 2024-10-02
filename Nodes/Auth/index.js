const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require('./model/user')
const flash = require('flash');
const session = require('express-session');

//set connection with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/authDemo')
    .then(() => {
        console.log("Connection established !!")
    })
    .catch(err => {
        console.log("Connection issue")
        console.log(err)
    })

app.use(express.urlencoded({ extended: true }));

// const sessionConfig = {
//     secret: 'notagoodsecret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }

//set up a session
app.use(session({ secret: 'notagoodsecret' }))


const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect("/login")
    }
    next();
}

app.set('view engine', 'ejs');
app.set('views', 'views');






app.get('/register', (req, res) => {
    res.render('register')
})



app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    // const hash = await bcrypt.hash(password, 12)
    const user = new User({
        username, password
        //  password:hash
    })
    await user.save()
    req.session.user_id = user._id;
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', async (req, res) => {
    const { password, username } = req.body;
    // const user = await User.findOne({ username });
    // const validPassword = await bcrypt.compare(password, user.password)
    const foundUser = await User.findandValidate(username, password);

    // if (validPassword) {
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/');
    }
    else {
        res.send('tryagain')
    }


})

app.post('/logout', (req, res) => {
    //req.session.user_id = null;
    req.session.destroy()
    res.redirect('/login')
})

app.get("/secret", requireLogin, (req, res) => {

    res.send('hello')
})

app.get("/", requireLogin, (req, res) => {

    res.render('home')
})

app.listen("3000", () => {
    console.log("listening on 3000")
})
