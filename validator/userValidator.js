const joi = require("joi");

/**
 * Joi Validation schema for validating user account creation.
 */
exports.CreateUserValidator = {
  first_name: joi
    .string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  last_name: joi
    .string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  phone_number: joi
    .string()
    .regex(/^[0]\d{10}$/)
    .required(),
  password: joi
    .string()
    .min(6)
    .required(),
  confirmpassword: joi
    .string()
    .min(6)
    .required(),
  gender: joi.string().default(null),
  dob: joi.date().default(null),
  income_range: joi.string().default(null),
  relationship_status: joi.string().default(null),
  employee_status: joi.string().default(null),
  user_image: joi.string().default(null)
};
