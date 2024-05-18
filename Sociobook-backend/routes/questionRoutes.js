const express = require("express");
const { createQues, deleteQues, getQues, searchQues } = require("../controllers/questionController");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

router.post("/create", validateToken, createQues);

router.delete("/delete/:id", validateToken, deleteQues);

router.get("/get/:id", validateToken, getQues);

router.get("/search", validateToken, searchQues);

module.exports = router;