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
    userAnswer
} = require("./user.controller");


router.post("/register", createUser);
router.post("/addcategory", createCategory);
router.get("/category", getCategories);
router.get("/quizbycategory/:id", getQuizByCategoryId);
router.get("/category/:id", getCategoryByID);
router.post("/login", login);
router.post("/addquestion", addQuestion);
router.get("/getquestion/:id", getQuestionByQuizId);
router.post("/useranswer", userAnswer)


// router.patch("/", updateUsers);
// router.delete("/", deleteUser);
// router.post("/upload",upload);
// router.post("/email",sendEmail);
// router.get("/:id", getUserByUserId);

module.exports = router;
