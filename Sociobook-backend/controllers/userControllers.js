const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const Topic = require("../models/topicSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

// @desc - description => User signup
// @route - POST /users/signup
// @access - public

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const signUp = asyncHandler(async (req, res) => {
    const { username, firstname, lastname, email, password, topics } = req.body;
    const file = req.files.avatar;

    if (!username || !firstname || !lastname || !email || !password) {
        res.status(400);
        throw new Error("Required Fields not filled");
    }

    const userAvailable = await User.findOne({ username });

    if (userAvailable) {
        res.status(400);
        throw new Error("Username already exists");
    }

    let avatar = null;
    if (file) {
        await cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
            avatar = result.url;
        });
    }

    // Hash password 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
        avatar,
        topics
    });

    if (user) {
        res.status(200).json({ message: `User ${username} created successfully` });
    }
    else {
        res.status(500);
        throw new Error("Server Error");
    }
});

// @desc - description => User signin
// @route - POST /users/signin
// @access - public

const signIn = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("Required Fields not filled");
    }

    const user = await User.findOne({ username });

    if (!user) {
        res.status(400);
        throw new Error("Username not found");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname
                },
            },
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "300m" }
        );
        res.status(200).json({ accessToken, username: user.username, id: user.id });
    } else {
        res.status(401);
        throw new Error("Username or password is not valid");
    }
});

// @desc - description => Get current user
// @route - GET /users/current/:username
// @access - private

const currentUser = asyncHandler(async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username });

    const topic = user.topics;
    let topicNames = await Promise.all(topic.map(async function (item) {
        const tempTopic = await Topic.findById(item);
        return { topicName: tempTopic.name, topicId: item };
    }));

    res.status(200).json({ username: user.username, id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, topics: topicNames, avatar: user.avatar });
});

// @desc - description => Update Current user
// @route - PUT /users/update/:username
// @access - private

const updateUser = asyncHandler(async (req, res) => {
    const username = req.params.username;
    const { topics } = req.body;
    const file = req.files.avatar;

    console.log(topics);
    console.log(file);

    let avatar = null;
    if (file) {
        await cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
            console.log(result);
            avatar = result.url;
        });
    }

    console.log(avatar);

    const user = await User.findOneAndUpdate({ username: username },
        { topics: topics, avatar: avatar },
        { new: true }
    );

    res.status(200).json({ message: `Current user updated: ${req.params.username}` });
});

module.exports = { signUp, signIn, currentUser, updateUser };