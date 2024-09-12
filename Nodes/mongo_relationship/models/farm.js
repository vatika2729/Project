const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})


const schema = mongoose.Schema;

const productSchema = new schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Winter', 'Summer', 'Rainy']
    }
});

const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
//     { name: 'Goddess Melon', Price: 4.99, season: 'Summer' },
//     { name: 'Sugar', Price: 4.49, season: 'Summer' },
//     { name: 'Asparagus', Price: 1.99, season: 'Spring' },
// ])

const farmSchema = new schema({
    name: String,
    city: String,
    product: [{
        type: schema.Types.ObjectId, ref: 'Product'
    }]
})

const Farm = mongoose.model('Farm', farmSchema)

const makeFarm = async () => {
    const farm = new Farm({
        name: 'Full Belly Farms',
        city: 'Guinda city US',
        product: await Product.findOne({
            name: 'Goddess Melon'
        })
    })

    // const melon = await Product.findOne({
    //     name: 'Goddess Melon'
    // })
    farm.save()
}

Farm.findOne({ name: 'Full Belly Farms' }).populate('product').then((p) => {
    console.log(p)
}).catch(e => console.log(e));

// makeFarm();