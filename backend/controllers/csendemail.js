const sendEmail = require('../algorithms/SendEmail');
const verificationcodemodel = require('../models/mverificationcode');
const usermodel = require('../models/muser');
const username = 'Parthiv';
const email = 'dhanyvadh2@gmail.com'
const code = '123456';
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
dotenv.config();




const ForgotPassword = async (req, res) => {

  const { email } = req.body;

  const randomNumber = Math.floor(Math.random() * 1000000);
  const code = String(randomNumber).padStart(6, '0');

  const result = await verificationcodemodel.findOneAndUpdate({
    email: email
  }, {
    code: code
  });

  if (!result) {
    return res.status(210).json({ success: false, message: "User associated with this email doesn't exist" });
  }


  try {

    await sendEmail(result.username, email, code).then((result) => console.log('Email sent...\n', result)).catch((error) => console.log(error.message));
  }
  catch (err) {
    return res.status(210).json({ success: false, message: `Failed to send email\n ${err}` });
  }


  return res.status(202).json({ success: true, message: "Verification code sent successfully" });
};


const ForgotPasswordVarifyCode = async (req, res) => {

  const { email, code } = req.body;

  console.log(email, code);


  const result = await verificationcodemodel.findOne({ email: email });

  if (!result) {
    return res.status(210).json({ success: false, message: "User associated with this email doesn't exist" });
  }
  // console.log(result.code, code);

  const enteredCode = code.join('');

  if (result.code !== enteredCode) {
    return res.status(210).json({ success: false, message: "Invalid verification code" });
  }

  return res.status(202).json({ success: true, message: "verification successfully" });
}


const ForgotPasswordResetPassword = async (req, res) => {

  const { email, password } = req.body;

  const result = await usermodel.findOneAndUpdate({ email: email }, { password: password });

  if (!result) {
    return res.status(210).json({ success: false, message: "User associated with this email doesn't exist" });
  }

  return res.status(202).json({ success: true, message: "Password reset successfully" });
}


module.exports = { ForgotPassword, ForgotPasswordVarifyCode, ForgotPasswordResetPassword };