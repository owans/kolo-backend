const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      phone_number: {
        type: Number,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
        select: false
      },
      confirmpassword: {
        type: String,
        required: true,
        select: false
      },
      secret_token: { 
        type: String
      },
    
      is_active: {
        type: Boolean
      },
    
      gender: {
        type: String,
        enum: ["Male", "Female", "Others"]
      },
      dob: {
        type: Date
      },
      income_range: {
        type: String,
        enum: [
          "0-50000",
          "50001-100000",
          "100001-250000",
          "250001-500000",
          "500001 and above"
        ]
      },
      relationship_status: {
        type: String,
        enum: ["Single", "Married", "Divorced"]
      },
      employee_status: {
        type: String,
        enum: ["Student", "Unemployed", "Employed"]
      }

});

//model which provides us with an interface to interact with our data
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;