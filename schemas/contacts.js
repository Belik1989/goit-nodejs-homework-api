const Joi = require("joi");

const addSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `missing required field "name"`,
  }),
  email: Joi.string().required().messages({
    "string.empty": `"email" cannot be an empty field`,
    "any.required": `missing required field "email"`,
  }),
  phone: Joi.string().required().messages({
    "string.empty": `"phone" cannot be an empty field`,
    "any.required": `missing required field "phone"`,
  }),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  contactUpdateFavoriteSchema,
};
