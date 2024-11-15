const router = require("express").Router();

const { addBookmarkArticle, deleteBookmarkArticle, getBookmarkArticle, isBookmarked, addLikeArticle, deleteLikeArticle, isLiked, addFollow, deleteFollow, isFollowed, addComment, deleteComment, getCommentsOfArticles } = require("../controllers/cuserdo.js");


router.post("/isbookmarked", isBookmarked);

router.get("/bookmark", getBookmarkArticle);

router.post("/addBookmark", addBookmarkArticle);

router.post("/deleteBookmark", deleteBookmarkArticle);


router.post("/isLiked", isLiked);
router.post("/addlike", addLikeArticle);
router.post("/deleteLike", deleteLikeArticle);


router.post("/follow", addFollow);
router.post("/unfollow", deleteFollow);
router.post("/isfollowed", isFollowed);


router.post("/getComments", getCommentsOfArticles);
router.post("/addComment", addComment);
router.post("/deleteComment", deleteComment);



module.exports = router;