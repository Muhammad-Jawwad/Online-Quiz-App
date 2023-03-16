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
  searchCategory,
  fetchData,
  checkAnswer
} = require("./user.service");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const XLSX = require('xlsx');

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
    /**
    Body Require:
     * user_id
     * mobile_number
     * password
     * email_id
     * name
     */
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
  fetchData: (req, res) => {
    /**
     * Body Require:
     * id as end-point
     */
    const id = req.params.id;
    fetchData(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Error fetching data from database",
          data: []
        });
      } else {
        // Converting Json in to an Array of Object
        const arr = Object.entries(results).map(([key, Value]) => ({ Key: key, Value }));

        // Checking is the arr is an array 
        console.log("The object is an array", Array.isArray(arr));

        console.log("There is no error in data fetching", arr);

        // Method for converting in to excel Sheet
        const convertJsonToExcel = () => {
          const workbook = XLSX.utils.book_new();
          const worksheet = XLSX.utils.json_to_sheet(arr);
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
          const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });


          // Downloading the Excel Sheet 
          res.setHeader('Content-Disposition', `attachment; filename=${results.name}_Data.xlsx`);
          res.setHeader('Content-Type', 'application/octet-stream');
          res.send(excelBuffer);
        }
        convertJsonToExcel();
      }

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
  attemptedQuizByUserId: (req, res) => {
    /**
     * Body Require:
     * User id
     */
    const body = req.body;
    console.log(body);
    attemptedQuizByUserId(body.user_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        console.log("No result found")
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
          data: []
        });
      }
      else{
        console.log("result found");
        return res.json({
          code: 200,
          status: true,
          message: "Data found",
          data: results
        });
      }
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
  //For Questions in Quiz App
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
        // Inserting the status = 0 in the quiz_completed to indicate the start of quiz
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
  
  userAnswer: (req, res) => {
    /**
     * Body requires:
     * User id
     * Quiz id
     * Question id
     * Entered option
     */

    // Getting the params
    const body = req.body;
    const user_id = body.user_id;
    const quiz_id = body.quiz_id;
    const question_id = body.question_id;
    const entered_option = body.entered_option;

    // Intializing flags
    var msg = "Sorry! Your answer is incorrect!";
    var check = 0;

    // Checking the answered question 
    checkAnswer(question_id, entered_option, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      else {
        console.log("The previous question that answered: ", results);
        //Checking answer
        if (results == 1) {
          check = 1;
          msg = "Congratulations! Your answer is correct"
          console.log("Answer Status", msg);
        }
      }
      // Adding in question attempted 
      addInAttempted(user_id, question_id, quiz_id, entered_option, check, (err) => {
        if (err) {
          console.log(err);
        }
      });
      console.log("The question added in attempted question")
      return res.json({
        code: 200,
        status: true,
        message: msg,
      });
    });
  },
  getNextQuestion:  (req, res) => {
    /**
     * Body requires:
     * user_id
     * quiz_id
     */
    const body = req.body;
    const user_id = body.user_id;
    const quiz_id = body.quiz_id;

    getQuestionByQuizId(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(!results);
      if (!results) {
        console.log("Next Question not found");
        //When there is no question left in quiz we need to calculate it's score
        quizAttempted(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("From quizAttempted fun: ", !results);

          // Now getting the calculated score from quiz_attempted
          scoreByQuizId(body, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("From scoreByQuizId fun: ", !results);

            //update status in quiz completed table
            updateStatus(user_id, quiz_id, (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log("From updateStatus fun: ", !results);
            });
            return res.json({
              code: 200,
              status: true,
              message: "The quiz is ended",
              score: results
            });
          });
        });
        
      }
      else {
        console.log("The next question after answer", results);
          return res.json({
            code: 200,
            status: true,
            message: "This is the next question",
            data: results
          });
      }
    });
  }
}
