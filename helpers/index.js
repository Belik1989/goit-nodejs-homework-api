const RequestError = require("./RequestError");

const handleMongooseError = require("../middlewares/handleMongooseError");

module.exports = {
  RequestError,
  handleMongooseError,
};
