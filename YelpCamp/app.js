if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}



const express = require('express');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');


//require the express error file to pass status and message
const ExpressError = require('./utils/ExpressError');


const app = express();
const path = require('path');

//require the routes
const campgroundsRouter = require('./routes/campgrounds');
const reviewsRouter = require('./routes/reviews');
const userRouter = require('./routes/user');


//requrie the models

const User = require("./models/user");


//Database connection
mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

app.engine("ejs", ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//parsing of body for post request

app.use(express.urlencoded({ extended: true }));


//Use the method override for put and delete request
app.use(methodOverride('_method'));


app.use(express.static(path.join(__dirname, 'public')))

//setting up session

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

app.use(session(sessionConfig))
app.use(flash());


//using passport for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.get("/fakeUser", async (req, res) => {
    const user = new User({ email: 'mukul@gmail.com', username: "mukulg@123" })
    const newUser = await User.register(user, 'chicken');
    res.send(newUser);
})

//defining the url path for the routers
app.use("/campgrounds", campgroundsRouter);
app.use("/", userRouter);
app.use("/campgrounds/:id/reviews", reviewsRouter);

app.get('/', (req, res) => {
    res.render('home')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 400))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "something went wrong";
    res.status(statusCode).render('error', { err });

})

app.listen(3000, () => {
    console.log('serving on port 3000')
})