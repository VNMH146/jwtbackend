import userService from "../service/userService.js";

const handleHome = (req, res) => {
  return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList();

  return res.render("user.ejs", { userList });
}

const handleCreateUser = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;


  userService.createNewUser(username, email, password);

  return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {

  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
}

module.exports = {
  handleHome,
  handleUserPage,
  handleCreateUser,
  handleDeleteUser
}