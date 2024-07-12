import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";



// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Huy0774792593',
//   database: 'jwt'
// })
// //check connection
// connection.connect(function (error) {
//   if (!!error) {
//     console.log(error);
//   } else {
//     console.log('Connected to database');
//   }
// });


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
}

const createNewUser = (username, email, password) => {
  let hashPass = hashUserPassword(password);

  connection.query(
    'INSERT INTO users (username, email,password) VALUES (?, ?, ?)', [username, email, hashPass],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  )
}

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Huy0774792593',
    database: 'jwt',
    Promise: bluebird,
  });
  let users = [];
  // connection.query(
  //   'Select * from users',
  //   function (err, results, fields) {
  //     if (err) {
  //       console.log(err);
  //       return users;
  //     }
  //     users = results;
  //     return users;

  //   }
  // )
  try {
    const [rows, fields] = await connection.execute(
      'Select * from users'
    );
    return rows;
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
  createNewUser,
  getUserList
}