const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const fileUpload = require("express-fileupload");
const cors = require('cors');

const port = process.env.PORT;

const app = express();
app.use(express.json());

connectDb();

app.use(fileUpload({
    useTempFiles: true,
    createParentPath: true
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use("/", require("./routes/homeRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/topics", require("./routes/topicRoutes"));
app.use("/questions", require("./routes/questionRoutes"));
app.use("/answers", require("./routes/answerRoutes"));
app.use("/comments", require("./routes/commentRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});