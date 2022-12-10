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
  attemptedQuizByUserId,
  updateUser
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
  updateUsers: (req, res) => {
    const body = req.body;
    console.log(body);
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return false;
      }
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Failed to update user",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Updated successfully",
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
  getCategories: (req, res) => {
    getCategories((err, results) => {
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
  getCategoryByID: (req, res) => {
    const id = req.params.id;
    getCategoryByID(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
          data: []
        });
      }
      results.password = undefined;
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
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
          code: 400,
          status: false,
          message: "Data not found",
          data: []
        });
      }
      results.password = undefined;
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
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
  getQuestionByQuizId: (req, res) => {
    const id = req.params.id;
    getQuestionByQuizId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      //There is some issue to be resolved!
      if (!results) {
        console.log("No Question found");
        quizAttempted(id, (err, results) => {
          if (err) {
            console.log(err);
            return res.json({
              code: 400,
              status: false,
              message: "Data not found",
              data: []
            });
          }
        });
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
  userAnswer: (req, res) => {
    let result = false;
    const body = req.body;
    getQuestionById(body.question_id, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
          data: []
        });
      }
      console.log(results);

      if (results.correct_option == body.entered_option) {
        result = true;
      }

      addInAttempted(body, result, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({
            code: 400,
            status: false,
            message: "Data not found",
            data: []
          });
        }
      });

      if (result) {
        results.correct_option = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h"
        });
        return res.json({
          code: 200,
          status: true,
          message: "Data found",
          data: jsontoken
        });
      } else {
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
          data: []
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
  scoreByQuizId: (req, res) => {
    const id = req.params.id;
    scoreByQuizId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
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
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email_id, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
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
          message: "Data found",
          // data: jsontoken
          data: results
        });
      } else {
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
          data: []
        });
      }
    });
  }
}
