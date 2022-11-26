const {
  create,
  getUserByUserEmail,
  getCategories,
  getCategoryByID,
  createCategory,
  getQuizByCategoryId,
  addQuestion,
  getQuestionByQuizId,
  getQuestionById,
  addInAttempted,
  quizAttempted,
  scoreByQuizId,
  attemptedQuizByUserId
} = require("./user.service");


const { hashSync, genSaltSync, compareSync } = require("bcrypt");

const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  createCategory: (req, res) => {
    const body = req.body;
    console.log(req, "No error occur");
    createCategory(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  getCategories: (req, res) => {
    getCategories((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getCategoryByID: (req, res) => {
    const id = req.params.id;
    getCategoryByID(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getQuizByCategoryId: (req, res) => {
    const id = req.params.id;
    getQuizByCategoryId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  addQuestion: (req, res) => {
    const body = req.body;
    console.log(req, "No error occur");
    addQuestion(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  getQuestionByQuizId: (req, res) => {
    const id = req.params.id;
    getQuestionByQuizId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        console.log("No Question found");
        quizAttempted(id, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
              message: err
            });
          }
        });
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }

      // results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  userAnswer: (req, res) => {
    let result = false;
    const body = req.body;
    getQuestionById(body.question_id, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid Question Id"
        });
      }
      console.log(results);

      if (results.correct_option == body.entered_option) {
        result = true;
      }

      addInAttempted(body, result, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
            message: err
          });
        }
      });

      if (result) {
        results.correct_option = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "Answer is Correct",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Answer is Wrong",
          message: result
        });
      }
    });
  },
  attemptedQuizByUserId: (req, res) => {
    const id = req.params.id;
    attemptedQuizByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  scoreByQuizId: (req, res) => {
    const id = req.params.id;
    scoreByQuizId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email_id, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  }
}
