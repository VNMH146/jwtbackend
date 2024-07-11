import userService from "../service/userService.js";

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


  // userService.createNewUser(username, email, password);
  userService.getUserList();
  return res.send("Create user");
}

module.exports = {
  handleHome,
  handleUserPage,
  handleCreateUser
}