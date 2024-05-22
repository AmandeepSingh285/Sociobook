const express = require("express");
const { createComment } = require("../controllers/commentController");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

router.post("/create", validateToken, createComment);

module.exports = router