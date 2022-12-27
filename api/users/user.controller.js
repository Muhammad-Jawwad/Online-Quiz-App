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
  updateStatus,
  quizStatus,
  scoreByQuizId,
  attemptedQuizByUserId,
  updateUser,
  searchCategory
} = require("./user.service");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
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
      if (!results.length) {
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
    /**
     * Body Require:
     * User Id
     * Category id
     */
    const body = req.body;
    getCategoryByID(body.category_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Category not found at given id",
          data: []
        });
      }
      // results.password = undefined;
      return res.json({
        code: 200,
        status: true,
        message: "The category at a particular Id",
        data: results
      });
    });
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
  getQuizByCategoryId: (req, res) => {
    /**
     * Body Require:
     * user_id
     * category_id
     */
    const body = req.body;
    getQuizByCategoryId(body.category_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Quiz by category id not found",
          data: []
        });
      }
      // results.password = undefined;
      return res.json({
        code: 200,
        status: true,
        message: "Quiz by category id found",
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
    /**
     * Body requires:
     * user_id
     * quiz_id
     */
    const body = req.body;
    // console.log(id);
    getQuestionByQuizId(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(!results);
      if (!results) {
        console.log("No Question found");
        return res.json({
          code: 400,
          status: false,
          message: "First Question not found",
          data: []
        });
      }
      else {
        console.log("This is from get question", results)
        quizStatus(body, (err, result) => {
          //One user can start the same quiz again
          if (err) {
            console.log(err);
            return;
          }
          console.log("The result at quiz status is: ", result);
          if (!result) {
            console.log("Unable to insert in quiz completed");
            return res.json({
              code: 400,
              status: false,
              message: "Unable to insert in quiz completed",
              data: []
            });
          }
          console.log("Inserted in quiz_complete")
        });
        return res.json({
          code: 200,
          status: true,
          message: "First question found",
          data: results
        });
      }
    });
  },
  attemptedQuizByUserId: (req, res) => {
    /**
     * Body Require:
     * User id
     */
    const body = req.body;
    attemptedQuizByUserId(body.user_id, (err, results) => {
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
    /**
     * Body requires:
     * User id
     * Quiz id
     */
    const body = req.body;
    scoreByQuizId(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Score not calculated",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "The score has found successfully",
        data: results
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email_id, (err, results) => {
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
  userAnswer: (req, res) => {
    /**
     * Body requires:
     * User id
     * Quiz id
     * Question id
     * Entered option
     */
    const body = req.body;
    var check = false;
    var msg = "Sorry! Your answer is incorrect!";
    getQuestionById(body.question_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(!results);
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Question you want to answer not found",
          data: []
        });
      }
      console.log("The previous question that answered: ", results);
      //Checking answer
      if (results.correct_option == body.entered_option) {
        check = true;
        msg = "Congratulations! Your answer is correct"
        console.log("Answer Status", check);
      }
      //Adding the question into attempted question
      addInAttempted(body, check, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({
            code: 400,
            status: false,
            message: "Data not added to attempted question table",
            data: []
          });
        }
      });
      console.log("The question added in attempted question")
    });
    //Calling next question
    getQuestionByQuizId(body, (err, next_results) => {
      if (err) {
        console.log("Next Question finding error: ", err);
        return;
      }
      console.log(!next_results);
      if (!next_results) {
        console.log("No Question found");
        //When there is no question left in quiz we need to calculate it's score
        quizAttempted(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("From quizAttempted fun: ", !results);
          if (!results) {
            return res.json({
              code: 400,
              status: false,
              message: msg,
              data: "Score not calculated"
            });
          }
          // Now getting the calculated score from quiz_attempted
          scoreByQuizId(body, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("From scoreByQuizId fun: ", !results);
            if (!results) {
              return res.json({
                code: 400,
                status: false,
                message: msg,
                data: "Score not found"
              });
            }
            //update status in quiz completed table
            updateStatus(body, (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log("From updateStatus fun: ", !results);
              if (!results) {
                return res.json({
                  code: 400,
                  status: false,
                  message: msg,
                  data: "Status not Updated"
                });
              }
            });
            return res.json({
              code: 200,
              status: true,
              message: msg,
              data: "The quiz is ended",
              score: results
            });
          });
        });
      }
      else {
        console.log("The next question after answer", next_results);
        return res.json({
          code: 200,
          status: true,
          message: msg,
          data: next_results
        });
      }
    });
  }
}
