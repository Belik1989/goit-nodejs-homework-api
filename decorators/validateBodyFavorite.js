const { RequestError } = require("../helpers");

const validateBodyFavorite = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      next(RequestError(400, "Missing fields favorite"));
      return;
    }
    if (error) {
      next(RequestError(400, error.message));
    }
    next(error);
  };
  return func;
};

module.exports = validateBodyFavorite;
