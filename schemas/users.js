const Joi = require("joi");

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userUpdateSubscription = Joi.object({
  // email: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSubscription,
};
