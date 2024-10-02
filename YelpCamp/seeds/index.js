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
            author: '66edda35ea152dfadc0fe977',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [`${cities[random1000].longitude}`, `${cities[random1000].latitude}`]
            },

            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id aliquid quos laborum iure assumenda soluta delectus ipsa quaerat cumque. Dolore mollitia harum cumque dolorem iure labore voluptatibus est voluptas distinctio.",
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dbklb0ciu/image/upload/v1727212117/YelpCamp/ygnuk1al5lrry9e9harj.png',
                    filename: 'YelpCamp/ygnuk1al5lrry9e9harj'
                },
                {
                    url: 'https://res.cloudinary.com/dbklb0ciu/image/upload/v1727212123/YelpCamp/dsiyikifay4a50nnjtty.png',
                    filename: 'YelpCamp/dsiyikifay4a50nnjtty'
                },
                {
                    url: 'https://res.cloudinary.com/dbklb0ciu/image/upload/v1727212123/YelpCamp/z1j5f5xqf0bjmfyv6vai.png',
                    filename: 'YelpCamp/z1j5f5xqf0bjmfyv6vai'
                },
                {
                    url: 'https://res.cloudinary.com/dbklb0ciu/image/upload/v1727212129/YelpCamp/rpugwopqkymibvytp9mv.png',
                    filename: 'YelpCamp/rpugwopqkymibvytp9mv'
                }
            ]
        })
        await camp.save();
    }



}

seedDB().then(() => {
    mongoose.connection.close();
});