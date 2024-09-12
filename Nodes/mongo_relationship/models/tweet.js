const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    age: Number
})



const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
})
const Tweet = mongoose.model('Tweet', tweetSchema);
const User = mongoose.model("User", userSchema);



// const makeTweets = async () => {
//     const user = await User.findOne(
//         {
//             username: 'chickenfan99'
//         }
//     )
//     const tweet2 = new Tweet({
//         text: "bock ock my chickens make noises",
//         likes: 5151
//     })
//     tweet2.user = user;
//     tweet2.save()
// }


// makeTweets()

const tweet = async () => {
    const t = await Tweet.findOne({}).populate('user', 'username')
    console.log(t);
}

tweet()