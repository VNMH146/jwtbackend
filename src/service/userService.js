import bcrypt from "bcryptjs";
import mysql from "mysql2";
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Huy0774792593',
  database: 'jwt'
})
//check connection
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log('Connected to database');
  }
});


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

const getUserList = () => {
  let users = [];
  connection.query(
    'Select * from users',
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      console.log("check results", results);
    }
  )
}

module.exports = {
  createNewUser,
  getUserList
}