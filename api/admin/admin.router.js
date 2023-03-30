const router = require("express").Router();

const {
    getRegisteredStudents,
    getStudentById,
    createAdmin,
    login,
    updateAdmin,

    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    searchCategory,

    getQuiz,
    getQuizById,
    createQuiz,
    updateQuiz,

    createQuestion,
    getQuestion,
    getQuestionById,
    updateQuestion

} = require("./admin.controller");


//Routes
/**
 * Admin Register and login
 */
router.post("/register", createAdmin);
router.get("/registeredstudents", getRegisteredStudents);
router.get("/studentbyid",getStudentById);
router.post("/login", login);
router.patch("/updateadmin", updateAdmin);


/**
 * Catagory Routes
 */
router.post("/addcategory", createCategory);
router.get("/getcategory", getCategory);
router.get("/categorybyid", getCategoryById);
router.patch("/updatecategory", updateCategory);

router.get("/searchcategory", searchCategory)


/**
 * Quiz Routes
 */
router.post("/addquiz", createQuiz);
router.get("/getquiz", getQuiz);
router.get("/quizbyid", getQuizById);
router.patch("/updatequiz", updateQuiz);

/**
 * Question Routes
 */
router.post("/addquestion", createQuestion);
router.get("/getquestion", getQuestion);
router.get("/questionbyid", getQuestionById);
router.patch("/updatequestion", updateQuestion);


module.exports = router;
