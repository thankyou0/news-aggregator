const router = require("express").Router();
const { ScrapTop_stories } = require("../algorithms/top_stories");

router.get("/top_stories", ScrapTop_stories);



module.exports = router;