const User = require('../models/user')
const jwt = require('jsonwebtoken');


const SecretKey = 'secretKey';

module.exports.renderRegister = (req, res) => {
    res.render('registration')
}

module.exports.register = async (req, res) => {
    
    let user = new User(req.body);
    let Val = await User.findOne({ email: req.body.email })
    
    if (!Val) {
        await User.register(new User(req.body), req.body.password)
    const token = jwt.sign({ userId: user._id }, SecretKey, { expiresIn: '1h' })
    
    res.status(201).json({ ...req.body, token });
    }
    else {
        res.status(400).send('Email already exists')
    }
    

}
module.exports.login = async (req, res) => {
    let user= req.user
    const token = jwt.sign({ userId: user._id }, SecretKey, { expiresIn: '1h' })
    res.status(200).json({ message:"Logged in successfully", token })
}