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
                "https://avatars.dicebear.com/api/identicon/" + data.name + ".svg"
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
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
    addInAttempted: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into attempted_questions(question_id,user_id,entered_option) 
              values(?,?,?)`,
            [
                data.question_id,
                data.user_id,
                data.entered_option
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getQuestionByQuizId: (id, callBack) => {
        pool.query(
            `select question,option_1,option_2,option_3,option_4 from quiz_questions where quiz_id = ? and id NOT IN (SELECT question_id FROM attempted_questions) ORDER BY RAND() LIMIT 1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
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
    }
}
