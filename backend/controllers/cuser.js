const usermodel = require("../models/muser");
const quickSearch_model = require("../models/mquicksearch");
const verificationcodemodel = require("../models/mverificationcode");
const jsonwebtoken = require("jsonwebtoken");
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const express = require("express");
const app = express();

dotenv.config();

const cloudinary_v2 = require('../utils/cloudinary').v2;

const logInPost = async (req, res) => {

  console.log("req.body", req.body);

  const { email, password, role } = req.body;


  if (!role || !email || !password) {
    return res.status(210).json({ success: false, message: "All fields required" });
  }

  console.log(req.body.email);

  const userExist = await usermodel.findOne({
    email, role
  });

  if (!userExist) {
    return res.status(210).json({ success: false, message: "User not exist" });
  }

  // console.log(req.body.email);
  // Decrypt the stored password
  const decryptedPwd = CryptoJS.AES.decrypt(password, "news-aggregator-secret").toString(CryptoJS.enc.Utf8);
  console.log("decryptedPwd", decryptedPwd);
  
  const decrypteuserExistPwd = CryptoJS.AES.decrypt(userExist.password, "news-aggregator-secret").toString(CryptoJS.enc.Utf8);
  console.log("decrypteuserExistPwd", decrypteuserExistPwd);
  

  if (decryptedPwd !== decrypteuserExistPwd) {
    return res.status(210).json({ success: false, message: "Invalid password" });
  }

  const token = jsonwebtoken.sign({ id: userExist._id }, process.env.JWT_SECRET);

  return res.status(202).json({ success: true, message: "User signed in successfully", token: token });

};

const signUpPost = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(210).json({ success: false, message: "Please fill all the fields" });   // WRITE RETURN OTHERWISE ERROR
  }
  try {


    const userExist = await usermodel.findOne({ email, role });

    if (userExist) {
      return res.status(210).json({ success: false, error: "User already exists for given role" });
    }

    let cloudinaryURL = "";
    if (role === "PROVIDER") {
      app.use(express.json(
        {
          limit: '50mb',
        }
      ));
      const cloudinary_res = await cloudinary_v2.uploader.upload(req.file.path, {
        folder: 'news-aggregator',
        // use_filename: `news-aggregator-${username}--- ${Date.now()}`,
        resource_type: "auto",
      });
      // console.log(cloudinary_res.secure_url);
      cloudinaryURL = cloudinary_res.secure_url;
    }


    const user = new usermodel({ username, email, password, role, certificate: cloudinaryURL });
    await user.save();


    if (role === "READER") {
      const quickSearch = new quickSearch_model({
        user_id: user._id, quickSearchText: ['AI', 'FINANCE', 'TECH', 'EDUCATION', 'ENTERTAINMENT', 'CLIMATE CHANGE', 'SOCIETY', 'CULTURE', 'SPORTS'
        ]
      });
      await quickSearch.save();
    }


    const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET);

    // console.log("token", token);

    const verificationCode = new verificationcodemodel({
      username,
      email,
      code : "123456"
    })
    await verificationCode.save();


    return res.status(202).json({ success: true, message: "user registered successfully", token: token });
  } catch (err) {
    console.log(err);
    return res.status(210).json({ success: false, message: "Error in signup", err: err });
  }
};


const getUserProfile = async (req, res) => {
  const user = await usermodel.findById(req.user.id).select("-password");
  return res.status(202).json({ success: true, user: user });
}


const updateUserProfile = async (req, res) => {

  
  const user =
    await usermodel.findByIdAndUpdate
      (req.user.id,
        req.body,
        { new: true }
    );
  
  if(!user){
    return res.status(210).json({ success: false, message: "User not found" });
  }
  return res.status(202).json({ success: true, message: "Profile Updated Successfully" });
}




module.exports = { logInPost, signUpPost, getUserProfile, updateUserProfile };
