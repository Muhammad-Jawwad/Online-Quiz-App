const router = require("express").Router();

const {
    createUser,
    createCategory,
    login,
    getQuizByCategoryId,
    getCategories,
    getCategoryByID
} = require("./user.controller");

// router.get("/", getUsers);
router.post("/register", createUser);
router.post("/addcategory", createCategory);
router.get("/category", getCategories);
router.get("/quizbycategory/:id", getQuizByCategoryId);
router.get("/category/:id", getCategoryByID);
// router.get("/:id", getUserByUserId);
router.post("/login", login);
// router.patch("/", updateUsers);
// router.delete("/", deleteUser);
// router.post("/upload",upload);
// router.post("/email",sendEmail);

module.exports = router;
