const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
photo: {

},

first_name:{
    type: String,
    required: true
},
last_name:{
    type: String,
    required: true
},

gender:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true
},
password:{
    type: String,
    required: true,
    select: false
}



});

//model which provides us with an interface to iteract with our data
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;