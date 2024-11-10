const bookmark_model = require('../models/mbookmark');
const like_model = require('../models/mlike');
const usermodel = require('../models/muser');
const newsProvidermodel = require('../models/mnewsProvider');

const getBookmarkArticle = async (req, res) => {
  const bookmarks = await bookmark_model.find({ user_id: req.user.id });

  return res.status(202).json({ success: true, bookmarks });
}

const isBookmarked = async (req, res) => {
  const { title, link } = req.body;

  if (!title || !link) {
    return res.status(210).json({ success: false, message: "Title and Link is required" });
  }

  const bookmark = await bookmark_model.findOne({ user_id: req.user.id, title, link });

  if (!bookmark) {
    return res.status(202).json({ success: true, bookmarked: false });
  }

  return res.status(202).json({ success: true, bookmarked: true });
}

const addBookmarkArticle = async (req, res) => {

  const { title, link, providerImg, providerName, imgURL, someText } = req.body;

  if (!title && !link) {
    return res.status(210).json({ success: false, message: "Title and Link are required" });
  }


  const newBookmark = new bookmark_model({
    user_id: req.user.id, title, link, providerImg, providerName, imgURL, someText
  });

  await newBookmark.save();

  return res.status(202).json({ success: true, message: "Bookmark added successfully" });
}

const deleteBookmarkArticle = async (req, res) => {

  const { title, link } = req.body;

  if (!title && !link) {
    return res.status(210).json({ success: false, message: "Title and Link are required" });
  }

  await bookmark_model.findOneAndDelete({ user_id: req.user.id, title, link });

  return res.status(202).json({ success: true, message: "Bookmark deleted successfully" });
}

const addLikeArticle = async (req, res) => {


  // console.log(req.body);
  // return res.status(202).json({ success: true, message: "Like added successfully" });


  const { title } = req.body;

  if (!title) {
    return res.status(210).json({ success: false, message: "Title is required" });
  }

  const newLike = new like_model({
    user_id: req.user.id, title
  });

  await newLike.save();

  return res.status(202).json({ success: true, message: "Like added successfully" });

}

const deleteLikeArticle = async (req, res) => {

  const { title } = req.body;

  if (!title) {
    return res.status(210).json({ success: false, message: "Title is required" });
  }

  await like_model.findOneAndDelete({ user_id: req.user.id, title });

  return res.status(202).json({ success: true, message: "Like deleted successfully" });
}

const isLiked = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(210).json({ success: false, message: "Title is required" });
  }

  const like = await like_model.findOne({ user_id: req.user.id, title });

  if (!like) {
    return res.status(202).json({ success: true, liked: false });
  }

  return res.status(202).json({ success: true, liked: true });
}

const addFollow = async (req, res) => {
  const { baseURL } = req.body;

  if (!baseURL) {
    return res.status(210).json({ success: false, message: "BaseURL is required" });
  }

  const provider = await newsProvidermodel.findOneAndUpdate({ baseURL }, { $addToSet: { followers: req.user.id } });

  const user = await usermodel.findByIdAndUpdate(req.user.id, { $addToSet: { following: baseURL } });




  if (!provider|| !user) {
    return res.status(210).json({ success: false, message: "error while Follow" });
  }

  return res.status(202).json({ success: true, message: "Followed successfully" });
}

const deleteFollow = async (req, res) => { 

  const { baseURL } = req.body;

  if (!baseURL) {
    return res.status(210).json({ success: false, message: "BaseURL is required" });
  }

  const provider = await newsProvidermodel.findOneAndUpdate({ baseURL }, { $pull: { followers: req.user.id } });

  const user = await usermodel.findByIdAndUpdate(req.user.id, { $pull: { following: baseURL } });

  if (!provider|| !user) {
    return res.status(210).json({ success: false, message: "error while unfollow" });
  }

  return res.status(202).json({ success: true, message: "Unfollowed successfully" });
}

const isFollowed = async (req, res) => {

  try {
    const { baseURL } = req.body;

    if (!baseURL) {
      return res.status(210).json({ success: false, message: "BaseURL is required" });
    }

    const user_follow = await usermodel.findById(req.user.id).select('following');

    if (user_follow.following.includes(baseURL)) {
      return res.status(202).json({ success: true, isFollowing: true });
    }

    return res.status(202).json({ success: true, isFollowing: false });
  } catch (error) {
    console.error('Failed to check follow status:', error);
    return res.status(210).json({ success: false, message: "Error while checking follow status" });
  }
}


module.exports = { addBookmarkArticle, deleteBookmarkArticle, getBookmarkArticle, isBookmarked, addLikeArticle, deleteLikeArticle, isLiked, addFollow, deleteFollow, isFollowed };



