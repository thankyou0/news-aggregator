const router = require("express").Router();
const {scrapSearch} = require("../algorithms/search.js");
router.get("/", scrapSearch);

module.exports = router;