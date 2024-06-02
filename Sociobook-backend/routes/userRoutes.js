const express = require("express");
const { signIn, signUp, currentUser, updateUser } = require("../controllers/userControllers");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/current/:username", validateToken, currentUser);

router.put("/update/:username", validateToken, updateUser);

module.exports = router