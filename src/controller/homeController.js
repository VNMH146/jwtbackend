import userService from "../service/userService.js";

const handleHome = (req, res) => {
  return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList();
  console.log("Check List:", userList);
  return res.render("user.ejs", { userList });
}

const handleCreateUser = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;


  // userService.createNewUser(username, email, password);

  return res.send("Create user");
}

module.exports = {
  handleHome,
  handleUserPage,
  handleCreateUser
}