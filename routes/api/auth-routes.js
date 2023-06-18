const express = require("express");

const authControllers = require("../../controllers/auth-controllers");

const schemas = require("../../schemas/users");

const { validateBody, validateBodySubscription } = require("../../decorators");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  authControllers.signup
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

module.exports = router;
