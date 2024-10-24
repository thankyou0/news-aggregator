const router = require("express").Router();
const { ForgotPassword, ForgotPasswordVarifyCode, ForgotPasswordResetPassword } = require("../controllers/csendemail.js");


router.post("/forgotpassword", ForgotPassword);

router.post("/forgotpassword/verifycode", ForgotPasswordVarifyCode);

router.post("/forgotpassword/resetpassword", ForgotPasswordResetPassword);

module.exports = router;