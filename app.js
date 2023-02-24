require("dotenv").config();


const express = require("express");
const bodyParser = require('body-parser');
const userRouter = require("./api/users/user.router");


const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use("/api/users", userRouter);


app.listen(process.env.APP_PORT, () => {
    console.log("server up and running on PORT :", process.env.APP_PORT);
});
