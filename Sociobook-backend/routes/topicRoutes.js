const express = require("express");
const { getAllTopics, getSpecificTopic, createTopic } = require("../controllers/topicController");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

router.get("/allTopics", getAllTopics);

router.get("/:topicname", getSpecificTopic);

router.post("/create", validateToken, createTopic);

module.exports = router;