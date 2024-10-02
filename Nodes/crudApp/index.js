const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const Product = require('./models/product');
const Farm = require('./models/farm');
const session = require('express-session');
const flash = require('connect-flash');



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
//create session
const sessionOption = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOption));

//flash message
app.use(flash())

//set the url encoded, to make the post request
app.use(express.urlencoded({ extended: true }));

//Use to make put and delete request
app.use(methodOverride('_method'))

//middleware for the flash messaes to display on success

app.use((req, res, next) => {
    res.locals.messages = req.flash('success');
    next();
})


// created dynamic category and loop over under the new.ejs and edit.ejs
const categories = ['fruit', 'vegetable', 'dairy', 'plant', 'fungi'];


//Farm Routers
app.get('/farms', async (req, res) => {


    const farms = await Farm.find({})
    res.render('farms/index', { farms })

})


app.get("/farms/new", (req, res) => {
    res.render('farms/new')
})

app.get("/farms/:id", async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id).populate('products');
    res.render('farms/show', { farm });

})


app.get('/farms/:id/edit', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('farms/edit', { farm });
})



app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body)
    await farm.save();
    req.flash('success', 'Farm added successfully');
    res.redirect(`/farms/${farm._id}`)

})

app.put('/farms/:id', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/farms/${farm._id}`);
})


app.delete('/farms/:id', async (req, res) => {

    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
})

app.get('/farms/:id/products/new', (req, res) => {
    const { id } = req.params;
    res.render('products/new', { categories, id })

})


//adding relationship
app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save(); res.redirect(`/farms/${id}`);

})

//Product Routers


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
// app.post('/products', async (req, res) => {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     // console.log(newProduct)
//     res.redirect(`/products/${newProduct._id}`)
// })

//Display the individual product
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate("farm", "name");
    //console.log(product);
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