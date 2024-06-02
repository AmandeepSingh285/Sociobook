const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentSchema");
const Answer = require("../models/answerSchema");

// @desc - description => create comment
// @route - POST /comments/create
// @access - private

const createComment = asyncHandler(async (req, res) => {
    const { ansId, user, content } = req.body;

    if (!ansId || !user || !content) {
        res.status(400);
        throw new Error("Valdiation Failed");
    }

    const newComment = await Comment.create({
        content, user
    });

    const answer = await Answer.findById(ansId);
    answer.comments.push(newComment.id);

    await answer.save();

    res.status(200).json({ message: "Commented successfully" });
});

module.exports = { createComment };