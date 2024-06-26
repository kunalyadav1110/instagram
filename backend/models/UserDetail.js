const mongoose = require("mongoose")

const UserDetailSchema = mongoose.Schema({
    username: String,
    password: String,
    fullName: String,
    mobile: Number,
    dp:String,
    following:Array,
    follower:Array,
    post: [
        {
            image: String,
            likes: Array,
            Comment:Array,
            share: Array,
            caption:String,
            username:String,
        }
    ],
    messages:[
        {
            username: String,
            message:
                {
                    time: Date,
                    by: String,
                    msg: String
                }
            
        }
    ]

    })

module.exports = mongoose.model("UserDetail", UserDetailSchema);