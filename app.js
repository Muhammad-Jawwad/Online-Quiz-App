require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');
const logger = require("morgan");
const userRouter = require("./api/users/user.router");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
/*The Implementation for the middleware*/
app.use((req, res, next) => {
    console.log("Middleware is calling:", "\nRequest Method -> ", req.method, "\nRequest IP -> ", req.ip, "\nRequest Path -> ", req.path);
    next();
});
app.use(logger());
app.use("/api/users", userRouter);


app.listen(process.env.APP_PORT, () => {
    console.log("server up and running on PORT :", process.env.APP_PORT);
});
