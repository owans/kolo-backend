const mongoose = require("mongoose");

/* Mongoose account schema */

const accountSchema = new mongoose.Schema({
  account_number: {
    type: String,
    required: true,
    unique: true
  },
  bank_name: {
    type: String,
    required: true
  },
  account_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number
  },
  success_alert: {
    type: Boolean
  },
  target_savings: {
    type: Number
  },
  fix_saving: {
    type: Number
  },
  piggy_flex: {
    type: String
  }
});

const accountModel = mongoose.model("Account", accountSchema);

module.exports = accountModel;
