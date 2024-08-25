const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const Product = require('./models/product');



//set connection with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("Connection established !!")
    })
    .catch(err => {
        console.log("Connection issue")
        console.log(err)
    })




//set the path
app.set('views', path.join(__dirname, 'views'));
//set the ejs
app.set('view engine', 'ejs');

//set up the local host connection
app.listen(3000, () => {
    console.log("Listening at port 3000");
})


//middleware 
//set the url encoded, to make the post request
app.use(express.urlencoded({ extended: true }));

//Use to make put and delete request
app.use(methodOverride('_method'))


// created dynamic category and loop over under the new.ejs and edit.ejs
const categories = ['fruit', 'vegetable', 'diary', 'plant', 'fungi'];
//fetch the products 
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, categories, category })
    }
    else {
        const products = await Product.find({})
        res.render('products/index', { products, categories, category: 'All' })
    }

})

// redirection of the add new product page
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})


// submit the post request and save to database
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)
})

//Display the individual product
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    console.log(product);
    res.render('products/show', { product });
})

// redirection on the update page with particular id
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
})

//update request need to use method override to make put request
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`);
})

//delete request need to use method override to make delete request

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})