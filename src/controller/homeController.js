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


const handleHome = (req, res) => {
  return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
}

const handleCreateUser = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  connection.query(
    'INSERT INTO users (username, email,password) VALUES (?, ?, ?)', [username, email, password],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  )
  return res.send("Create user");
}

module.exports = {
  handleHome,
  handleUserPage,
  handleCreateUser
}