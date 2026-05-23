const mongoose = require("mongoose");
const validator = require("validator")
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

// Define the User schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    lowercase: true, //Converts the string value to lowercase before storing it in the database.
    required: true,
    unique: true,
    match: /.+\@.+\..+/,// we can also add isEmail from validator 
    trim: true   //Removes leading and trailing whitespace from a string before saving it.
  },
  password: {
    type: String,
    required : true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a strong password :" + value)
      }
    }
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
  type: String,
  validate(value) {
    if (value === undefined || value === null) return true; // ✅ allow missing
    if (!["male", "female","other", "others"].includes(value)) {
      throw new Error("Gender is not valid");
    }
  },
},
  photoUrl:{
    type:String,
    default: "https://geographyandyou.com/images/user-profile.png",
    validate(value) {
      if (!validator.isURL(value)){
        throw new Error("Invalid URL :" + value)
      }
    }
  },
  about:{
    type:String,
    default: "This is a default about of the user!",
  },
  skills:{
    type: [String],

  }

});

userSchema.methods.getjwt = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "Fall@4756*2345", {
    expiresIn: "10d",
  });
  return token;
};


// Export the model
const User = mongoose.model("User", userSchema); //First parameter is the name of the moedel

module.exports = User;