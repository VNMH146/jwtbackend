import db from '../models/index'
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail }
  })

  if (user) {
    return true;
  } else {
    return false;
  }
}

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone }
  })

  if (user) {
    return true;
  } else {
    return false;
  }
}
const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
}
const registerNewUser = async (rawUserData) => {
  try {
    //check email/ phone are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: 'Email is already exist!',
        EC: 1,
      }
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: 'Phone is already exist!',
        EC: 1,
      }
    }
    //hash user password
    let hashPassword = hashUserPassword(rawUserData.password);
    //create new user
    await db.User.create({
      username: rawUserData.username,
      email: rawUserData.email,
      password: hashPassword,
      phone: rawUserData.phone
    })
    return {
      EM: 'A user is created successfully',
      EC: 0,
    }

  } catch (e) {
    return {
      EM: 'Something wrong in service...',
      EC: -2,
    }
  }
}



module.exports = {
  registerNewUser
}