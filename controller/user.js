const userModel = require("../models/userModel");

const handleUserRegister = async(req, res) => {
    const {name , email ,password} = req.body;

    if(!name||!email||!password) {
        return res.status(400).json({status:400, message:"All fields are required"});
    }

    const existUser = await userModel.findOne({email})
    if(existUser) {
        return res.status(409).json({status:409, message:"User already exist"});
    }

    const newUser = await userModel.create({name , email , password})
    const token = newUser.generateAuthToken();
    const userData = newUser.toObject()
    delete userData.password;

    return res.status(201).json({status:201, message:"Registered successfully", data:userData , token})
}


const handleUserLogin = async (req, res) => {
    const {email,password} = req.body

    if(!email||!password) {
        return res
          .status(400)
          .json({ status: 400, message: "All fields are required" });
    }

    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res
              .status(400)
              .json({ status: 400, message: "Invalid email and password" });  
        }

        const token = user.generateAuthToken();
        return res.status(200).json({status:200 , message:"LoggedIn successfully" , data:user , token})
        
    } catch (error) {
        return res.status(500).json({status:500, message:"internal server error"})
        
    }
};

module.exports = {
  handleUserRegister,
  handleUserLogin,
};