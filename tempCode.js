/*The Implementation for the middleware*/
let authenticated = true;
// middleware function to log requests
const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
}
// middleware function to authenticate users
const authenticate = (req, res, next) => {
    // authenticate user logic here
    if (authenticated) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}
// add middleware functions to the application
app.use(logger);
app.use(authenticate);
// define routes and controllers
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Used  in app.js
var cors = require('cors')
app.use(cors())