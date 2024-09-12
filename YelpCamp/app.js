const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const CampGround = require('./models/campground');
const Review = require('./models/review');
const catchAsync = require('./utils/catchAsync');
const { campgroundSchema, reviewSchema } = require('./schemas');


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


const validateCampground = (req, res, next) => {


    const { error } = campgroundSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        console.log(msg);
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }

}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        console.log(msg);
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await CampGround.find({});
    res.render('campgrounds/index', { campgrounds })
}))

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {

    const campground = new CampGround(req.body.campground);
    await campground.save();
    res.redirect(`campgrounds/${campground._id}`);
}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campgrounds = await CampGround.findById(id).populate('reviews');
    res.render('campgrounds/show', { campgrounds })
}))


app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campgrounds = await CampGround.findById(id);
    res.render('campgrounds/edit', { campgrounds })
}))

app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    //created campground in name fetch the data and get the campground object and spread the data and get it in the forme
    const campgrounds = await CampGround.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campgrounds._id}`);
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campgrounds = await CampGround.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
}))

app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const campground = await CampGround.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);

}))

app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    await CampGround.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))

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