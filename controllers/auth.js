const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//sign up

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user already existed
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Existed",
      });
    }

    //secure password

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "User cannot be registered... please try again later",
    });
  }
};
