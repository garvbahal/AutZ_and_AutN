const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authN = (req, res, next) => {
  try {
    const { token } = req.body;
    // verify the token
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is unauthorized",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for students",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for students",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
