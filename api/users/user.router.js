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
    scoreByQuizId,
    updateUsers,
    searchCategory,
    fetchData,
    getNextQuestion
} = require("./user.controller");


//Routes
/**
 * Post Routes
 */
router.post("/register", createUser);
router.post("/login", login);
router.post("/addcategory", createCategory);
router.post("/addquestion", addQuestion);


/**
 * Patch Routes
 */
router.patch("/updateuser", updateUsers);


/**
 * Get Routes
 */
router.get("/category", getCategories);
router.get("/categoryById", getCategoryByID);
router.get("/searchcategory", searchCategory);
router.get("/quizbycategoryId", getQuizByCategoryId);

router.get("/quizattemtedbyuser", attemptedQuizByUserId);
router.get("/quizscore", scoreByQuizId);
router.get("/fetchData/:id", fetchData);


//For Questions in Quiz App
router.get("/getquestion", getQuestionByQuizId);
router.post("/useranswer", userAnswer);
router.get("/nextquestion", getNextQuestion);

module.exports = router;
