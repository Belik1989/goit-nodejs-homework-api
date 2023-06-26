const { RequestError } = require("../helpers");

const validateBodySubscription = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        RequestError(400, "write subscription one of [starter, pro, business]")
      );
    }
    next();
  };
  return func;
};

module.exports = validateBodySubscription;
