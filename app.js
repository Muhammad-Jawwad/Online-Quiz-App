require("dotenv").config();

const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const bodyParser = require('body-parser');

var cors = require('cors')
app.use(cors())

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("server up and running on PORT :", process.env.APP_PORT);
});