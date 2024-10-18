const router = require("express").Router();

const { addBookmarkArticle, deleteBookmarkArticle, getBookmarkArticle, isBookmarked, addLikeArticle, deleteLikeArticle, isLiked } = require("../controllers/cuserdo.js");


router.post("/isbookmarked", isBookmarked);

router.get("/bookmark", getBookmarkArticle);

router.post("/addBookmark", addBookmarkArticle);

router.post("/deleteBookmark", deleteBookmarkArticle);


router.post("/isLiked", isLiked);

router.post("/addlike", addLikeArticle);

router.post("/deleteLike", deleteLikeArticle);

module.exports = router;