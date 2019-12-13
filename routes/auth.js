const express = require("express");
const { getToken } = require("../utils/tokenUtil");
const {
  validateRegistration,
  validateActivation,
  validateEmailAuthentication
} = require("../middlewares/authValidator");
const authController = require("../controllers/auth");
const authRouter = express.Router();

authRouter.post("/register", validateRegistration, authController.register);

authRouter.post("/activate", validateActivation, authController.activate);

authRouter.post(
  "/auth/email",
  validateEmailAuthentication,
  authController.loginWithEmail
);

module.exports = authRouter;
