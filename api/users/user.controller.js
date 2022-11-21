const {
    create,
    getUserByUserEmail,
    getCategories,
    getCategoryByID,
    createCategory,
    getQuizByCategoryId
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
        console.log(req,"No error occur");
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
