const mongoose = require('mongoose');
const Farm = require('./farm');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy', 'plant', 'fungi']
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
})


productSchema.post('findOneAndDelete', async function (product) {
    const farmId = product.farm._id;
    const farm = await Farm.findById(farmId);
    if (farm) {
        farm.products.pull(product._id);
        await farm.save();
    }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;