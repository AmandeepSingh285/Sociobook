const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const Topic = require("../models/topicSchema");
const Question = require("../models/questionSchema");
const Answer = require("../models/answerSchema");

// @desc - description => Home Route - display user topics and questions
// @route - GET /
// @access - private

const getUserHome = asyncHandler(async (req, res) => {
    const username = req.query.username;

    const user = await User.findOne({ username });
    if (!user) {
        res.status(500);
        throw new Error("Server Error");
    }

    const topics = user.topics;
    let home = await Promise.all(topics.map(async (id) => {
        let topic = await Topic.findById(id);
        let topicName = topic.name;
        let relatedQues = topic.questions;

        let quesAndAns = await Promise.all(relatedQues.map(async (qid) => {
            let ques = await Question.findById(qid);
            let content = ques.content;
            let user = ques.user;
            let ans = ques.answers;

            if (ans.length > 0) {
                let ansId = ans[0];
                let answer = await Answer.findById(ansId);
                let ansContent = answer.content;
                let ansUser = answer.user;

                return {
                    id: qid,
                    content,
                    user,
                    ansId,
                    ansContent,
                    ansUser
                };
            }

            return null;

        }));

        return {
            topicName,
            topicId: id,
            data: quesAndAns
        };

    }));

    res.status(200).json(home);
});

module.exports = { getUserHome };