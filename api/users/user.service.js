const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    console.log(data,'sajdain');
    console.log("\n Some Error is ocurred here");
    // console.log(data);
    
    pool.query(
      `insert into msgTable(name, email, subject, message) 
            values(?,?,?,?)`,
      [
        data.name,
        data.email,
        data.subject,
        data.message
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, data);
      }
    );
  },
  // getUserByUserEmail: (email, callBack) => {
  //   pool.query(
  //     `select * from msgTable where email = ?`,
  //     [email],
  //     (error, results, fields) => {
  //       if (error) {
  //         callBack(error);
  //       }
  //       return callBack(null, results[0]);
  //     }
  //   );
  // },
  // getUserByUserId: (id, callBack) => {
  //   pool.query(
  //     `select id,name,email,subject,message from msgTable where id = ?`,
  //     [id],
  //     (error, results, fields) => {
  //       if (error) {
  //         callBack(error);
  //       }
  //       return callBack(null, results[0]);
  //     }
  //   );
  // },
  getUsers: callBack => {
    pool.query(
      `select id,name,email,subject,message from msgTable`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
  // updateUser: (data, callBack) => {
  //   pool.query(
  //     `update msgTable set name=?, email=?, subject=?, message=? where id = ?`,
  //     [
  //       data.name,
  //       data.email,
  //       data.subject,
  //       data.message,
  //       data.id
  //     ],
  //     (error, results, fields) => {
  //       if (error) {
  //         callBack(error);
  //       }
  //       return callBack(null, results[0]);
  //     }
  //   );
  // },
  // deleteUser: (data, callBack) => {
  //   pool.query(
  //     `delete from msgTable where id = ?`,
  //     [data.id],
  //     (error, results, fields) => {
  //       if (error) {
  //         callBack(error);
  //       }
  //       return callBack(null, results[0]);
  //     }
  //   );
  // }
};