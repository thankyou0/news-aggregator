const router = require("express").Router();
const { logInPost, signUpPost } = require("../controllers/cuser");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {

    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


router.post("/login", logInPost);

router.post("/signup", upload.single("certificate"), signUpPost);


module.exports = router;