const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/moviesApp')
    .then(() => {
        console.log("Connection established !!")
    })
    .catch(err => {
        console.log("Connection issue")
        console.log(err)
    })

//define database schema

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
    Review: Boolean

})

//making instance of model used before calling main method
movieSchema.methods.find = function () {
    console.log('hey')
    console.log(this.title)
}

movieSchema.methods.reviews = function () {
    this.Review = !this.Review;
    return this.save();
}

movieSchema.statics.fire = function () {
    return this.updateMany({}, { rating: 'PG13', Review: false })
}
//creatig model

const movie = mongoose.model('Movie', movieSchema);

const findMovie = async () => {
    const foundMovie = await movie.findOne({ title: 'RRR' });
    console.log(foundMovie);
    await foundMovie.reviews();
    console.log(foundMovie);
}

movie.fire().then(res => {
    console.log(res);
}).
    catch(function (error) {
        console.log(error);
    });


//findMovie();

// const raone = new movie({
//     title: "Raone",
//     year: 2010,
//     score: 7.2,
//     rating: "U/A"
// })


// movie.updateMany(
//     { year: { $lt: 2012 } }, { $set: { Review: false } }
// )
//     .then(data => {
//         console.log('it works');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("error ")
//         console.log(err);
//     })
// movie.insertMany([
//     {
//         title: "Bahubali",
//         year: 2019,
//         score: 9.2,
//         rating: "U/A"
//     },
//     {
//         title: "RRR",
//         year: 2022,
//         score: 9.8,
//         rating: "U/A"
//     },
//     {
//         title: "Deadpool and wolverine",
//         year: 2024,
//         score: 8.4,
//         rating: "PG18"
//     },
//     {
//         title: "Fifty shades of grey",
//         year: 2012,
//         score: 6.2,
//         rating: "PG18"
//     },
//     {
//         title: "legend of Hanuman",
//         year: 2008,
//         score: 8.5,
//         rating: "U/A"
//     }

// ]).then(data => {
//     console.log("it worked")
//     console.log(data);
// })
//     .catch(err => {
//         console.log("error message")
//         console.log(err);
//     })


