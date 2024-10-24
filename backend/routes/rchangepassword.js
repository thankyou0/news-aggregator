const router = require("express").Router();

const { ChangePassword } = require("../controllers/cchangepassword.js");

router.post("/", ChangePassword);

module.exports = router;