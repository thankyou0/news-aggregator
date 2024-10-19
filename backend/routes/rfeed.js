const router = require("express").Router();
const { getMyFeed } = require("../algorithms/myFeed.js");

router.get("/getmyfeed", getMyFeed);

module.exports = router;