const express = require("express");

const validate = require("../../middlewares/validate.middleware");

const { registerSchema,loginSchema } = require("./validator");

const { register,login } = require("./controller");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);
router.post(
  "/login",
  validate(loginSchema),
  login
);

module.exports = router;