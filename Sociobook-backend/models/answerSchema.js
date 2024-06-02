const mongoose = require("mongoose");

const answerSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Answer", answerSchema);