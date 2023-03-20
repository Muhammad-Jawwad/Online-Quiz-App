const router = require("express").Router();

const {
    createAdmin,
    createCategory,
    login,
    addQuestion,
    updateUsers,
    getCategories,
    searchCategory
} = require("./admin.controller");


//Routes
/**
 * Post Routes
 */
router.post("/register", createAdmin);
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
router.get("/searchcategory", searchCategory);



module.exports = router;
