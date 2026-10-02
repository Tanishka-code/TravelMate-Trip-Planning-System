const express = require("express");
const { body } = require("express-validator");
const { rateLimit } = require("express-rate-limit");

const {
  registerUser,
  loginUser,
  getProfile,
  getAdminData
} = require("../controllers/userController");

const {
  authMiddleware,
  authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

// Rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    message: "Too many authentication attempts. Please try again later."
  }
});

// Registration validation
const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number")
];

// Login validation
const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];

// Register API
router.post(
  "/register",
  authLimiter,
  registerValidation,
  registerUser
);

// Login API
router.post(
  "/login",
  authLimiter,
  loginValidation,
  loginUser
);

// Protected profile API
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// Admin-only API
router.get(
  "/admin",
  authMiddleware,
  authorize("admin"),
  getAdminData
);

module.exports = router;