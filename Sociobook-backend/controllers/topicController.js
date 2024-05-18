const Topic = require("../models/topicSchema");
const asyncHandler = require("express-async-handler");
const Question = require("../models/questionSchema");
const Answer = require("../models/answerSchema");

// @desc - description => GET all topics
// @route - GET /topics/allTopics
// @access - public

const getAllTopics = asyncHandler(async (req, res) => {
    const topics = await Topic.find();
    let topicInfo = topics.map((item) => {
        return { name: item.name, id: item.id }
    });

    res.status(200).json({ topicInfo });
});

// @desc - description => GET specific topic
// @route - GET /topics/:topicname
// @access - public

const getSpecificTopic = asyncHandler(async (req, res) => {
    const name = req.params.topicname;

    if (!name) {
        res.status(400);
        throw new Error("Name field required in Topic");
    }

    const topic = await Topic.findOne({ name });

    if (!topic) {
        res.status(400);
        throw new Error("Topic doesnt exist");
    }

    const ques = topic.questions;
    let quesAndAns = [];

    for (let id of ques) {
        let quesDetails = await Question.findById(id);
        let quesName = quesDetails.content;
        let ansId = quesDetails.answers;
        if (ansId.length > 0) {
            let selectedAns = ansId[0];
            let ansDetails = await Answer.findById(selectedAns);
            let ans = ansDetails.content;

            quesAndAns.push({
                questionId: id,
                question: quesName,
                answerId: selectedAns,
                answer: ans
            });
        }
        else {
            quesAndAns.push({
                questionId: id,
                question: quesName,
                answerId: "",
                answer: ""
            });
        }
    }

    const result = {
        topic: topic.name,
        topicId: topic.id,
        content: quesAndAns
    };

    res.status(200).json(result);
});

// @desc - description => create new topic
// @route - POST /topics/create
// @access - private

const createTopic = asyncHandler(async (req, res) => {
    const { name, questions } = req.body;

    if (!name) {
        res.status(400);
        throw new Error("Name field required in Topic");
    }

    const topic = await Topic.findOne({ name });

    if (topic) {
        res.status(400);
        throw new Error("Topic Already exists");
    }

    const newTopic = await Topic.create({
        name, questions
    });

    if (newTopic) {
        res.status(200).json(newTopic);
    }
    else {
        res.status(500);
        throw new Error("Server Error");
    }

});

module.exports = { getAllTopics, getSpecificTopic, createTopic };