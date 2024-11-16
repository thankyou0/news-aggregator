// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// import usermodel from '../models/muser';
// const usermodel = require('../models/muser');

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import usermodel from '../models/muser.js';

dotenv.config();


const checkAuth =  (req, res, next) => {


  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(210).json({ success: false, message: "Authorization header not found" });
  }

  const token = authHeader.split(' ')[1];

  if (token == null) {
    return res.status(210).json({ success: false, message: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(210).json({ message: 'Invalid or expired token' });
    }


    req.user = user; // Store the user info for use in other routes

    const userExist = await usermodel.findById(user.id).select("-password");

    
    if (!userExist) {
      return res.status(210).json({ success: false, message: "User not found" });
    }




    // console.log("User:", user);
    next();
  });

};


// module.exports = checkAuth;

export default checkAuth;
