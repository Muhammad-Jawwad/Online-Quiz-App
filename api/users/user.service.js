const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into register_table(name, email_id, password, mobile_number) 
              values(?,?,?,?)`,
            [
                data.name,
                data.email_id,
                data.password,
                data.mobile_number
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
    getCategoryByID: (id, callBack) => {
        pool.query(
            `select category_id,category_name,category_picture,no_of_quiz from quiz_categories where category_id = ?`,
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
            `select category_id,category_name,category_picture,no_of_quiz from quiz_categories`,
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
            `select quiz_no,quiz_name,description from quiz_by_category where category_id = ?`,
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
    }
}
