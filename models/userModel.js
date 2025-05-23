const {model , Schema} = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET= process.env.JWT_SECRET
const newSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

newSchema.methods.generateAuthToken = function() {
    const payload = {id:this._id , email:this.email}

    return jwt.sign(payload, JWT_SECRET , {expiresIn:"1d"})
};


const userModel = model("User", newSchema);

module.exports = userModel;