const mongoose = require("mongoose");

const topicSchema = mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Please add a topic name"],
            unique: [true, "Topic name should be unique"],
        },
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Topic", topicSchema);