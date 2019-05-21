const joi = require("joi");

/**
 * Joi Validation schema for validating account creation.
 *
 */
exports.CreateAccountValidator = {
  account_number: joi
    .string()
    .regex(/^\d{10}$/)
    .required(),
  bank_name: joi.string().required(),
  account_name: joi.string().required(),
  _id: joi.string().required(),
  balance: joi.number().default(null),
  success_alert: joi.bool().default(null),
  target_savings: joi.number().default(null),
  fix_saving: joi.number().default(null),
  piggy_flex: joi.string().default(null)
};