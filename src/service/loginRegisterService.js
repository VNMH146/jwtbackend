import db from '../models/index'
import bcrypt from "bcryptjs";
import { Op } from 'sequelize';
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

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawData) => {
  try {

    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: rawData.valueLogin },
          { phone: rawData.valueLogin }
        ]
      }
    })

    if (user) {
      console.log("Found user with email/phone");
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword == true) {
        return {
          EM: 'ok!',
          EC: 0,
          DT: ''
        }
      }
    }
    console.log("Not found email or phone(user input):", rawData.valueLogin, "password", rawData.password);
    return {
      EM: 'Email or phone is incorrect',
      EC: 1,
      DT: ''
    }


    // if (isPhoneExist === true) {
    //   return {
    //     EM: 'Phone is already exist!',
    //     EC: 1,
    //     DT: ''
    //   }
    // }
  } catch (error) {
    console.log(error)
    return {
      EM: 'Something wrong in service...',
      EC: -2,
    }
  }



}

module.exports = {
  registerNewUser, handleUserLogin
}