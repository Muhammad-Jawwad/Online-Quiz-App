const router = require("express").Router();

const {
    createUser,
    createCategory,
    login,
    getQuizByCategoryId,
    getCategories,
    getCategoryByID,
    addQuestion,
    getQuestionByQuizId,
    userAnswer,
    attemptedQuizByUserId,
    scoreByQuizId
} = require("./user.controller");

//Routes
router.post("/register", createUser);
router.post("/addcategory", createCategory);
router.get("/category", getCategories);
router.get("/quizbycategory/:id", getQuizByCategoryId);
router.get("/category/:id", getCategoryByID);
router.post("/login", login);
router.post("/addquestion", addQuestion);
router.get("/getquestion/:id", getQuestionByQuizId);
router.post("/useranswer", userAnswer);
router.get("/quizattemtedbyuser/:id", attemptedQuizByUserId);
router.get("/quizscore/:id", scoreByQuizId);

module.exports = router;
