const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
    {

        content: {
            type: String,
            required: [true, "Please add the question"]
        },
        topics: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
            required: [true, "Please select some topics for the question"]
        }],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }]
    },
    {
        timestamps: true,
    }
);

questionSchema.index({ content: 'text' });

module.exports = mongoose.model("Question", questionSchema);