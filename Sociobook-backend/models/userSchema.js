const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {

        username: {
            type: String,
            required: [true, "Please add your username"],
            unique: [true, "Username should be unique"],
        },
        firstname: {
            type: String,
            required: [true, "Please add your Firstname"],
        },
        lastname: {
            type: String,
            required: [true, "Please add your Lastname"],
        },
        email: {
            type: String,
            required: [true, "Please add your email address"],
        },
        password: {
            type: String,
            required: [true, "Please add your password"],
        },
        avatar: {
            type: String
        },
        topics: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);