const { query } = require("express");
const pool = require("../../config/database");

module.exports = {
    /**
     * Admin Register and login
    */
    getRegisteredStudents: (callBack) => {
        pool.query(
            `select * from register_table`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getStudentById: (data, callBack) => {
        pool.query(
            `select * from register_table where id = ?`,
            [
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
    createAdmin: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into admin_register_table(name, email_id, password, mobile_number, profile_picture,gender) 
              values(?,?,?,?,?,?)`,
            [
                data.name,
                data.email_id,
                data.password,
                data.mobile_number,
                ("https://avatars.dicebear.com/api/identicon/" + data.name + ".svg").replace(/\s/g, ''),
                data.gender
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAdminByAdminEmail: (email, callBack) => {
        pool.query(
            `select * from admin_register_table where email_id = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateAdmin: (data, callBack) => {
        // console.log(data);
        pool.query(
            `update admin_register_table set name=?, email_id=?, password=?, mobile_number=?, gender=?, profile_picture=? where id = ?`,
            [
                data.name,
                data.email_id,
                data.password,
                data.mobile_number,
                data.gender,
                ("https://avatars.dicebear.com/api/identicon/" + data.name + ".svg").replace(/\s/g, ''),
                data.admin_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    /**
     * Catagory CRUD
     */

    getCategory: (callBack) => {
        pool.query(
            `select * from quiz_categories`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCategoryById: (data, callBack) => {
        pool.query(
            `select * from quiz_categories where id = ?`,
            [
                data.category_id
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
    updateCategory: (data, callBack) => {
        // console.log(data);
        pool.query(
            `update quiz_categories set category_name=?, category_picture=?, no_of_quiz=? where id = ?`,
            [
                data.category_name,
                data.category_picture,
                data.no_of_quiz,
                data.category_id
            ],
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
            `select * from quiz_categories where category_name like ?`,
            ['%' + name + '%'],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

     /**
     * Quiz CRUD
     */

     createQuiz: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into quiz_by_category(category_id,quiz_no,picture,quiz_name,no_of_questions,description,status) 
              values(?,?,?,?,?,?,?)`,
            [
                data.category_id,
                data.quiz_no,
                data.picture,
                data.quiz_name,
                data.no_of_questions,
                data.description,
                data.status
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
     getQuiz: (callBack) => {
        pool.query(
            `select * from quiz_by_category`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getQuizById: (data, callBack) => {
        pool.query(
            `select * from quiz_by_category where id = ?`,
            [
                data.quiz_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
     updateQuiz: (data, callBack) => {
        // console.log(data);
        pool.query(
            `update quiz_by_category set category_id=?, quiz_no=?, picture=?, quiz_name=?, no_of_questions=?, description=?, status=? where id = ?`,
            [
                data.category_id,
                data.quiz_no,
                data.picture,
                data.quiz_name,
                data.no_of_questions,
                data.description,
                data.status,
                data.quiz_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    /**
     * Question CRUD
     */

    createQuestion: (data, callBack) => {
    console.log(data);
        pool.query(
            `insert into quiz_questions(quiz_id,question,option_1,option_2,option_3,option_4,correct_option,status) 
              values(?,?,?,?,?,?,?,?)`,
            [
                data.quiz_id,
                data.question,
                data.option_1,
                data.option_2,
                data.option_3,
                data.option_4,
                data.correct_option,
                data.status
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },  
    getQuestion: (callBack) => {
        pool.query(
            `select * from quiz_questions`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getQuestionById: (data, callBack) => {
        pool.query(
            `select * from quiz_questions where id = ?`,
            [
                data.question_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateQuestion: (data, callBack) => {
        // console.log(data);
        pool.query(
            `update quiz_questions set quiz_id=?, question=?, option_1=?, option_2=?, option_3=?, option_4=?, correct_option=?, status=? where id = ?`,
            [
                data.quiz_id,
                data.question,
                data.option_1,
                data.option_2,
                data.option_3,
                data.option_4,
                data.correct_option,
                data.status,
                data.question_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}
