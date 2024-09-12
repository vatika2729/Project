// created this file to save the data in the data base from file cities.js and seedHelper.js
//const campground = require('../models/campground');
const CampGround = require('../models/campground');
const cities = require('../seeds/cities');
const { places, descriptors } = require('../seeds/seedHelper');

const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb://localhost:27017/yelp-camp')


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

// getting the value in array
const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {

    //delete the data from data base
    await CampGround.deleteMany({});


    //saving random data in database from seedhelper and cities file
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new CampGround({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id aliquid quos laborum iure assumenda soluta delectus ipsa quaerat cumque. Dolore mollitia harum cumque dolorem iure labore voluptatibus est voluptas distinctio.",
            price
        })
        await camp.save();
    }



}

seedDB().then(() => {
    mongoose.connection.close();
});