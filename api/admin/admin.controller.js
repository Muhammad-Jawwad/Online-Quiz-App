const {
  getRegisteredStudents,
  getStudentById,
  createAdmin,
  // login
  getAdminByAdminEmail,
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
   
  } = require("./admin.service");
  
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  const XLSX = require('xlsx');
  
  module.exports = {
  /**
  * Admin Register and login
  */
  getRegisteredStudents: (req,res) => {
    getRegisteredStudents((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    });
  },
  getStudentById: (req,res) => {
    /**Body Require:
     * user_id
    */
    const body = req.body;
    getStudentById(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    });
  },
  createAdmin: (req, res) => {
    /**
     Body Require:
     * name
     * email_id
     * password
     * mobile_number
     * gender
     */
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createAdmin(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          code: 400,
          status: false,
          message: "Unable to register Admin",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Admin registered successfully",
        data: results
      });
    });
  },
  login: (req, res) => {
    /**
     Body Require:
     * email_id
     * password
    */
    const body = req.body;
    getAdminByAdminEmail(body.email_id, (err, results) => {
      if (err) {
        console.log(err);
        return false;
      }
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Invalid email",
          data: []
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h"
        });
        return res.json({
          code: 200,
          status: true,
          message: "Successfully Login",
          // data: jsontoken
          data: results
        });
      } else {
        return res.json({
          code: 400,
          status: false,
          message: "Invalid email id or password",
          data: []
        });
      }
    });
  },
  updateAdmin: (req, res) => {
    /**
    Body Require:
     * admin_id
     * mobile_number
     * password
     * email_id
     * gender
     * name
     */
    const body = req.body;
    console.log(body);
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateAdmin(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return false;
      }
      if (!results) {
        console.log("Admin details are not updating")
        return res.json({
          code: 400,
          status: false,
          message: "Failed to update admin",
          data: []
        });
      }
      else{
        console.log("Admin details are updating");
        return res.json({
          code: 200,
          status: true,
          message: "Updated successfully",
          data: results
        });
      }
    });
  },

  /**
  * Catagory CRUD
  */
  createCategory: (req, res) => {
    /**
     Body Require:
     * category_name
     * category_picture
     * no_of_quiz
     */
    const body = req.body;
    createCategory(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    });
  },
  getCategory: (req, res) => {
    getCategory((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    });
  },
  getCategoryById: (req, res) => {
    /**
     Body Require:
     * catagory_id
    */
    const body = req.body;
    getCategoryById(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    });
  },
  updateCategory: (req, res) => {
/**
    Body Require:
     * catagory_id
     * category_name
     * category_picture
     * no_of_quiz
     */
    const body = req.body;
    console.log(body);
    updateCategory(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return false;
      }
      if (!results) {
        console.log("Category details are not updating")
        return res.json({
          code: 400,
          status: false,
          message: "Failed to update category",
          data: []
        });
      }
      else{
        console.log("Category details are updating");
        return res.json({
          code: 200,
          status: true,
          message: "Updated successfully",
          data: results
        });
      }
    });
  },
  searchCategory: (req, res) => {
    /**
     Body Require:
     * category_name
     * user_id
     */
    const body = req.body
    const name = body.category_name;
    console.log(name);
    searchCategory(name, (err, results) => {
      console.log("The result is: ", results);
      if (err) {
        console.log(err);
        return false;
      }
      if (!results.length) {
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
          data: []
        });
      }
      // results.password = undefined;
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    });
  },

  /**
  * Quiz CRUD
  */
  createQuiz: (req, res) => {
    /**
     Body Require:
     * category_id
     * quiz_no
     * picture
     * quiz_name
     * no_of_questions
     * description
     * status
     */
    const body = req.body;
    createQuiz(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return res.json({
          code: 400,
          status: false,
          message: "Quiz creation failed",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Sucessfully created new Quiz",
        data: results
      });
    });
  },
  getQuiz: (req,res) => {
    getQuiz((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    });
  },
  getQuizById: (req,res) => {
    /**
     Body Require:
     * quiz_id
     */
    const body = req.body;
    getQuizById(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    });
  },
  updateQuiz: (req,res) => {
/**
    Body Require:
     * quiz_id
     * category_id
     * quiz_no
     * picture
     * quiz_name
     * no_of_questions
     * description
     * status
     */
    const body = req.body;
    console.log(body);
    updateQuiz(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return false;
      }
      if (!results) {
        console.log("Quiz details are not updating")
        return res.json({
          code: 400,
          status: false,
          message: "Failed to update quiz",
          data: []
        });
      }
      else{
        console.log("Quiz details are updating");
        return res.json({
          code: 200,
          status: true,
          message: "Updated successfully",
          data: results
        });
      }
    });
  },
  /**
  * Question CRUD
  */
  createQuestion: (req,res) => {
    /**
     Body Require:
      * quiz_id
      * question
      * option_1
      * option_2
      * option_3
      * option_4
      * correct_option
      */
    const body = req.body;
    console.log(req, "No error occur");
    createQuestion(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    });
  },
  getQuestion: (req,res) => {
    getQuestion((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    });
  },
  getQuestionById: (req,res) => {
    /**
     Body Require:
     * question_id
     */
    const body = req.body;
    getQuestionById(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    });
  },
  updateQuestion: (req,res) => {
    /**
   Body Require:
    * quiz_id
    * question
    * option_1
    * option_2
    * option_3
    * option_4
    * correct_option
    */
   const body = req.body;
    console.log(body);
    updateQuestion(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return false;
      }
      if (!results) {
        console.log("Quiz details are not updating")
        return res.json({
          code: 400,
          status: false,
          message: "Failed to update quiz",
          data: []
        });
      }
      else{
        console.log("Quiz details are updating");
        return res.json({
          code: 200,
          status: true,
          message: "Updated successfully",
          data: results
        });
      }
    });
  }
}
  
  
