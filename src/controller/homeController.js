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

const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserById(id);
  let userData = {};
  userData = user;
  // if (user && user.length > 0) {
  //   userData = user[0];
  // }
  return res.render("user-update.ejs", { userData });
}
const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;
  await userService.updateUser(email, username, id);
  return res.redirect("/user");
}

module.exports = {
  handleHome,
  handleUserPage,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
  getUpdateUserPage
}