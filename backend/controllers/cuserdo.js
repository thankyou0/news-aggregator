const bookmark_model = require('../models/mbookmark');
const like_model = require('../models/mlike');
const express = require('express');


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

module.exports = { addBookmarkArticle, deleteBookmarkArticle, getBookmarkArticle, isBookmarked, addLikeArticle, deleteLikeArticle, isLiked };



