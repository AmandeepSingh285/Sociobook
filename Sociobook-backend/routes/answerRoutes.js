const express = require("express");
const { createAnswer, editAnswer, deleteAnswer } = require("../controllers/answerController");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

router.post("/create", validateToken, createAnswer);

router.put("/edit/:id", validateToken, editAnswer);

router.delete("/del/:id/:user", validateToken, deleteAnswer);

module.exports = router