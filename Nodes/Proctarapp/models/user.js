const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    }
   

})

userSchema.plugin(passportLocalMongoose,{
    usernameField: 'email'
});



module.exports = mongoose.model("User", userSchema);