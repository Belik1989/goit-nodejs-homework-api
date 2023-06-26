const express = require("express");

const authControllers = require("../../controllers/auth-controllers");

const schemas = require("../../schemas/users");

const { validateBody, validateBodySubscription } = require("../../decorators");

const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  authControllers.signup
);
router.get("/verify/:verificationToken", authControllers.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.userEmailSchema),
  authControllers.resendVerifyEmail
);

router.post(
  "/login",
  validateBody(schemas.userLoginSchema),
  authControllers.login
);

router.get("/current", authenticate, authControllers.getCurrent);

router.post("/logout", authenticate, authControllers.logout);

router.patch(
  "/_id/subscription",
  authenticate,
  validateBodySubscription(schemas.subscriptionSchema),
  authControllers.userUpdateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

module.exports = router;
