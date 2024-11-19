// const router = require("express").Router();
// const { scrapSearch } = require("../algorithms/search.js");

import express from "express";
const router = express.Router();


import temp from "../algorithms/search.js";

const { scrapSearch } = temp;

router.get("/:page", scrapSearch);
// router.get("/:page", (req,res)=> {res.send("Hello")});

export default router;;