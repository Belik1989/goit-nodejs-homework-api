const Joi = require("joi");

const userRegisterSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

const userUpdateSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
module.exports = {
  userRegisterSchema,
  userEmailSchema,
  userLoginSchema,
  userUpdateSubscription,
};
