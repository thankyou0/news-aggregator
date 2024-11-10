const router = require("express").Router();
const { getAllProviders, getFollowingProviders } = require("../controllers/cprovider.js");


router.get("/get_all_providers",getAllProviders);
router.get("/get_following_providers",getFollowingProviders);

module.exports = router;