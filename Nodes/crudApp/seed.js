const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("Connection established !!")
    })
    .catch(err => {
        console.log("Connection issue")
        console.log(err)
    })

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save().then(p => {
//     console.log(p)
// }
// ).
//     catch(error => {
//         console.log(error)
//     })4

const seedProducts = [
    {
        name: 'Mango',
        price: 2.55,
        category: 'fruit'
    },
    {
        name: 'Egg Plant',
        price: 2.55,
        category: 'vegetable'
    },
    {
        name: 'tomato',
        price: 0.55,
        category: 'vegetable'
    },
    {
        name: 'Water melons',
        price: 5.55,
        category: 'fruit'
    },
    {
        name: 'milk',
        price: 0.25,
        category: 'dairy'
    },
    {
        name: 'curd',
        price: 0.65,
        category: 'dairy'
    },
    {
        name: 'banana',
        price: 1.25,
        category: 'fruit'
    },
    {
        name: 'paneer',
        price: 6.25,
        category: 'dairy'
    },
    {
        name: 'peas',
        price: 8.25,
        category: 'vegetable'
    }
]

Product.insertMany(seedProducts).then(res => {
    console.log(res)
}).
    catch(error => {
        console.log(error)
    });