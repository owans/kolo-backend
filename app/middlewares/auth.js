const joi = require("joi");

module.exports = function joiValidator(schema) {
  return async (req, res, next) => {
    try {
      const result = await joi.validate(req.body, schema, {
        abortEarly: false
      });
      next();
    } catch (err) {
      console.log(err);
      const errordetails = err.details.map(err => err.message);
      res.status(422).json({
        status: "error",
        message: " ☹️ validation error occurred",
        errors: errordetails
      });
    }
  };
};