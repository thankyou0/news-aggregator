const router = require("express").Router();
const { AddreportArticles } = require("../controllers/creportarticles.js");

router.get("/", AddreportArticles);

module.exports = router;