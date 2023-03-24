const router = require("express").Router();

const {
    createAdmin,
    login,
    updateAdmin,

    getCategory,
    createCategory,
    updateCategory,
    searchCategory,

    getQuiz,
    createQuiz,
    updateQuiz,

    createQuestion,
    getQuestion,
    updateQuestion

} = require("./admin.controller");


//Routes
/**
 * Admin Register and login
 */
router.post("/register", createAdmin);
router.post("/login", login);
router.patch("/updateadmin", updateAdmin);


/**
 * Catagory Routes
 */
router.post("/addcategory", createCategory);
router.get("/getcategory", getCategory);
router.patch("/updatecategory", updateCategory);

router.get("/searchcatagory", searchCategory)


/**
 * Quiz Routes
 */
router.post("/addquiz", createQuiz);
router.get("/getquiz", getQuiz);
router.patch("/updatequiz", updateQuiz);

/**
 * Question Routes
 */
router.post("/addquestion", createQuestion);
router.get("/getquestion", getQuestion);
router.patch("/updatequestion", updateQuestion);


module.exports = router;
