const asyncHandler = require("express-async-handler");
const Question = require("../models/questionSchema");
const Topic = require("../models/topicSchema");
const Answer = require("../models/answerSchema");
const User = require("../models/userSchema");
const Comment = require("../models/commentSchema");

// @desc - description => Create a question
// @route - POST /questions/create
// @access - private

const createQues = asyncHandler(async (req, res) => {
    const { content, topics, user } = req.body;

    if (!content || !topics || !user) {
        res.status(400);
        throw new Error("Required Fields not filled");
    }

    console.log(content + topics + user);

    const newQues = await Question.create({
        content, topics, user
    });

    console.log(newQues);

    await Promise.all(topics.map(async (topicId) => {
        let currTopic = await Topic.findById(topicId);
        currTopic.questions.push(newQues.id);
        await currTopic.save();
    }));

    if (newQues) {
        res.status(200).json(newQues);
    }
    else {
        res.status(500);
        throw new Error("Server Error");
    }
});

// @desc - description => Delete question
// @route - DELETE /questions/delete/:id
// @access - private

const deleteQues = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    const ques = await Question.findById(id);
    const topicIds = ques.topics;

    if (!ques) {
        res.status(400);
        throw new Error("Question does not exist");
    }

    if (ques.user != userId) {
        res.status(400);
        throw new Error("Not Authorized");
    }

    await Question.deleteOne();

    await Promise.all(topicIds.map(async (tId) => {
        await Topic.findByIdAndUpdate(tId, {
            $pull: { questions: id }
        }, { new: true });
    }));

    res.status(200).json({ message: `Question deleted: ${ques.content} with id ${req.params.id}` });
});

// @desc - description => Get question
// @route - GET /questions/get/:id
// @access - private

const getQues = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const ques = await Question.findById(id);

    if (!ques) {
        res.status(400);
        throw new Error("Question Does Not Exist");
    }

    const ansId = ques.answers;
    const topicId = ques.topics;
    const userId = ques.user;

    const user = await User.findById(userId);

    let ansContent = await Promise.all(ansId.map(async (id) => {
        let answer = await Answer.findById(id);
        if (!answer)
            return null;
        let ansUser = await User.findById(answer.user);
        let commentId = answer.comments;

        let commentContent = await Promise.all(commentId.map(async (cid) => {
            let comment = await Comment.findById(cid);
            let commentUser = await User.findById(comment.user);
            return { id: cid, content: comment.content, user: comment.user, username: commentUser.username };
        }));

        return { id: id, content: answer.content, user: ansUser, userId: answer.user, comments: commentContent };
    }));

    ansContent = ansContent.filter(ans => ans !== null);

    let topicNames = await Promise.all(topicId.map(async (id) => {
        let topic = await Topic.findById(id);
        return topic;
    }));

    const question = {
        id: id,
        question: ques.content,
        user: user,
        answers: ansContent,
        topics: topicNames
    };

    res.status(200).json(question);
});


// @desc - description => Search question
// @route - GET /questions/search
// @access - private

const searchQues = asyncHandler(async (req, res) => {
    let content = req.query.content;
    // console.log(content);

    if (!content) {
        res.status(400);
        throw new Error("Valdiation Error")
    }

    content = content.split('%20').join(' ');

    // const questionList = await Question.find({ $text: { $search: content } });

    let regex = new RegExp(content, 'i');

    const tempQuestion = await Question.find({ content: regex });
    console.log(tempQuestion);

    res.status(200).json(tempQuestion);
});

module.exports = { createQues, deleteQues, getQues, searchQues };