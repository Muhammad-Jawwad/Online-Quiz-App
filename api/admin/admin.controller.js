const {
  createAdmin,
  // login
  getAdminByAdminEmail,
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
   
  } = require("./admin.service");
  
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  const XLSX = require('xlsx');
  
  module.exports = {
  /**
  * Admin Register and login
  */
  
  createAdmin: (req, res) => {
    /**
     * Body Require:
     * name
     * email_id
     * password
     * mobile_number
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
          message: "Unable to register user",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "User registered successfully",
        data: results
      });
    });
  },
  login: (req, res) => {
    /**
     * Body Require:
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
        console.log("User details are not updating")
        return res.json({
          code: 400,
          status: false,
          message: "Failed to update user",
          data: []
        });
      }
      else{
        console.log("User details are updating");
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
     * Body Require:
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
  // Need to code 
  updateCategory: (req, res) => {

  },
  searchCategory: (req, res) => {
    /**
     * Body Require:
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
  createQuiz: (req,res) => {

  },
  getQuiz: (req,res) => {

  },
  updateQuiz: (req,res) => {

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

  },
  updateQuestion: (req,res) => {

  }
}
  
  
