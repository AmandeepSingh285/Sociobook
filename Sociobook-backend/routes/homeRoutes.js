const express = require("express");
const { getUserHome } = require("../controllers/homeController");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

router.get("/", validateToken, getUserHome);

module.exports = router;