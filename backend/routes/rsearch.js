const router = require("express").Router();
const {scrapSearch} = require("../algorithms/search.js");

router.get("/:page", scrapSearch);

module.exports = router;