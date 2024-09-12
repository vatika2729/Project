const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})


const schema = mongoose.Schema;

const userSchema = new schema({
    first: String,
    last: String,
    address: [
        {
            _id: { _id: false },
            street: String,
            city: String,
            state: String,
            country: {
                type: String,
                required: true

            }
        }
    ]
})

const User = mongoose.model('User', userSchema)

const makeUser = async () => {
    const u = new User({
        first: 'Jerry',
        last: 'Potter',
        address: [{
            street: 'L Block',
            city: 'Noida',
            state: 'UP',
            country: 'India'
        },
        {
            street: 'L1 Block',
            city: 'Noida',
            state: 'UP',
            country: 'India'
        }
        ]

    })

    const res = await u.save();
    console.log(res);


}

makeUser();