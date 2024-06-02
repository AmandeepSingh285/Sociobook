const asyncHandler = require("express-async-handler");
const Answer = require("../models/answerSchema");
const Question = require("../models/questionSchema");

// @desc - description => create new answer
// @route - POST /answers/create
// @access - private

const createAnswer = asyncHandler(async (req, res) => {
    const { qid, content, user } = req.body;

    if (!qid || !content || !user) {
        res.status(400);
        throw new Error("Valdiation Error");
    }

    const answer = await Answer.create({
        content,
        user,
        question: qid,
    });

    const ques = await Question.findById(qid);
    ques.answers.push(answer.id);

    await ques.save();

    res.status(200).json(answer);
});

// @desc - description => Edit answer
// @route - PUT /answers/edit/:id
// @access - private

const editAnswer = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { content, user } = req.body;

    const answer = await Answer.findById(id);

    if (answer.user != user) {
        res.status("400");
        throw new Error("Validation Error");
    }

    const editAns = await Answer.findByIdAndUpdate(id, {
        $set: { content: content }
    }, { new: true });

    const newAns = await Answer.findById(id);

    res.status(200).json(newAns);
});

// @desc - description => Delete answer
// @route - DELETE /answers/del/:id/:user
// @access - private

const deleteAnswer = asyncHandler(async (req, res) => {
    const { id, user } = req.params;

    const answer = await Answer.findById(id);

    if (answer.user != user) {
        res.status(400);
        throw new Error("Valdiation Error");
    }

    const delAns = await Answer.deleteOne({ _id: id });

    res.status(200).json({ message: `Answer ${id} deleted` });
});

module.exports = { createAnswer, editAnswer, deleteAnswer };