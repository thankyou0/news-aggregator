const router = require("express").Router();
const { getQuickSearch, addQuickSearch, deleteQuickSearch } = require("../controllers/cquicksearch");


router.get("/get", getQuickSearch );

router.post("/add", addQuickSearch);

router.delete("/delete", deleteQuickSearch);


module.exports = router;