const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/auth");
const { authN, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);
router.get("/student", authN, isStudent, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Protected route for Students",
  });
});

router.get("/admin", authN, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Protected route for Admin",
  });
});

module.exports = router;
