const { RequestError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      next(RequestError(400, "Missing fields name,mail,phone"));
      return;
    }
    if (error) {
      next(RequestError(400, error.message));
    }
    next(error);
  };
  return func;
};

module.exports = validateBody;
