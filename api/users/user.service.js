const { query } = require("express");
const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into register_table(name, email_id, password, mobile_number, profile_picture) 
              values(?,?,?,?,?)`,
            [
                data.name,
                data.email_id,
                data.password,
                data.mobile_number,
                ("https://avatars.dicebear.com/api/identicon/" + data.name + ".svg").replace(/\s/g, '')
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateUser: (data, callBack) => {
        // console.log(data);
        pool.query(
            `update register_table set name=?, email_id=?, password=?, mobile_number=?, profile_picture=? where id = ?`,
            [
                data.name,
                data.email_id,
                data.password,
                data.mobile_number,
                ("https://avatars.dicebear.com/api/identicon/" + data.name + ".svg").replace(/\s/g, ''),
                data.id
                // ("https://avatars.dicebear.com/api/identicon/" + data.name + ".svg").replace(/\s/g, '')

            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    fetchData: (user_id, callBack) => {
        console.log("Calling from service: ", user_id);

        pool.query(
            `SELECT * FROM register_table WHERE id = ?`,
            [
                user_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                // console.log(query);
                return callBack(null, results[0]);
            }
        );
    },
    createCategory: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into quiz_categories(category_name,category_picture,no_of_quiz) 
              values(?,?,?)`,
            [
                data.category_name,
                data.category_picture,
                data.no_of_quiz
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    addQuestion: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into quiz_questions(quiz_id,question,option_1,option_2,option_3,option_4,correct_option) 
              values(?,?,?,?,?,?,?)`,
            [
                data.quiz_id,
                data.question,
                data.option_1,
                data.option_2,
                data.option_3,
                data.option_4,
                data.correct_option
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },   
    getCategoryByID: (id, callBack) => {
        pool.query(
            `select id,category_name,category_picture,no_of_quiz from quiz_categories where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getCategories: callBack => {
        pool.query(
            `select id,category_name,category_picture,no_of_quiz from quiz_categories`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    searchCategory: (name, callBack) => {
        console.log(name);
        pool.query(
            `select category_name,category_picture,no_of_quiz from quiz_categories where category_name like ?`,
            ['%' + name + '%'],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getQuizByCategoryId: (id, callBack) => {
        pool.query(
            `select quiz_no,picture,quiz_name,no_of_questions,description from quiz_by_category where category_id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from register_table where email_id = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getQuestionById: (question_id, callBack) => {

        pool.query(
            `select * from quiz_questions where id = ?`,
            [question_id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    attemptedQuizByUserId: (id, callBack) => {
        pool.query(
            `select quiz_id,score from attempted_quiz where user_id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    //For Questions
    quizStatus: (data, callBack) => {
        const status = false;
        pool.query(
            `insert into quiz_completed(user_id,quiz_id,quiz_status) 
            values(?,?,?)`,
            [
                data.user_id,
                data.quiz_id,
                status
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateStatus: (user_id, quiz_id, callback) => {
        const sql = "UPDATE quiz_completed SET quiz_status = 1 WHERE user_id = ? AND quiz_id = ?";
        pool.query(sql,
            [
                user_id,
                quiz_id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("Quiz status updated in the quiz_completed table.");
                    callback(null, result);
                }
            });
    },
    scoreByQuizId: (data, callBack) => {
        pool.query(
            `select score from attempted_quiz where (quiz_id,user_id) = (?,?)`,
            [
                data.quiz_id,
                data.user_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    quizAttempted: (body, callBack) => {
        pool.query(
            `INSERT INTO attempted_quiz(quiz_id,user_id,score) VALUES (?,?,(select sum(answer) from attempted_questions where user_id = ? and question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = ?)));`,
            [
                body.quiz_id,
                body.user_id,
                body.user_id,
                body.quiz_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getQuestionByQuizId: (body, callback) => {
        const sql = "SELECT * FROM quiz_questions WHERE quiz_id = ? AND id NOT IN (SELECT question_id FROM attempted_questions WHERE user_id = ? AND quiz_id = ?) ORDER BY RAND() LIMIT 1;";
        pool.query(sql,
            [
                body.quiz_id,
                body.user_id,
                body.quiz_id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("Next question found:", result[0]);
                    callback(null, result[0]);
                }
            });
    },
    addInAttempted: (user_id, question_id, quiz_id, entered_option, is_correct, callback) => {
        const sql = "INSERT INTO attempted_questions (user_id, question_id, quiz_id, entered_option, answer) VALUES (?, ?, ?, ?, ?)";
        pool.query(sql,
            [
                user_id,
                question_id,
                quiz_id,
                entered_option,
                is_correct
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("Inserted in the attempted question table.");
                    callback(null, result);
                }
            });
    },
    checkAnswer: (question_id, entered_option, callBack) => {
        const sql = `SELECT count(id) as count FROM quiz_questions WHERE id = ? AND correct_option = ? ;`;
        pool.query(
            sql,
            [
                question_id,
                entered_option
            ],
            (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let r = results[0].count;
                    console.log("From db ", r);
                    callBack(null,r);
                }
            }
        );
    }  
}
