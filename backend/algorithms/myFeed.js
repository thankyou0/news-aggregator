import mongoose from "mongoose";
import searchLocation_model from "../models/msearchLocation.js";
import { ScrapForFeed } from "../algorithms/ScrapForFeed.js";

const getTextByCount = async (id) => {

  const resultByCount = await searchLocation_model.aggregate([
    { $match: { user_id: new mongoose.Types.ObjectId(id) } },  // Match user_id
    { $unwind: "$searchText" },  // Flatten the searchText array
    { $sort: { "searchText.count": -1 } },  // Sort by count in descending order
    { $project: { _id: 0, text: "$searchText.text" } }  // Project only the 'text' field
  ]);


  const resultByUpdatedAt = await searchLocation_model.aggregate([
    { $match: { user_id: new mongoose.Types.ObjectId(id) } },  // Match user_id
    { $unwind: "$searchText" },  // Flatten the searchText array
    { $sort: { "searchText.updateAt": -1 } },  // Sort by count in descending order
    { $project: { _id: 0, text: "$searchText.text" } }  // Project only the 'text' field
  ]);


  if (resultByCount.length === 0 && resultByUpdatedAt.length === 0) {
    return [];
  }

  const textArrayForCount = resultByCount.map(item => item.text);
  const textArrayForUpdatedAt = resultByUpdatedAt.map(item => item.text);

  const interleavedSet = new Set();  // Use a Set to avoid duplicates
  const maxLength = 8;  // Set maximum length

  const totalLength = Math.max(textArrayForCount.length, textArrayForUpdatedAt.length);

  // Interleave the two arrays and add to the Set
  for (let i = 0; i < totalLength; i++) {
    if (interleavedSet.size >= maxLength) break;  // Stop if the set reaches the max length

    if (i < textArrayForCount.length) {
      interleavedSet.add(textArrayForCount[i]);
    }
    if (interleavedSet.size >= maxLength) break;  // Check again after adding

    if (i < textArrayForUpdatedAt.length) {
      interleavedSet.add(textArrayForUpdatedAt[i]);
    }
  }
  const interleavedArray = Array.from(interleavedSet);

  if (interleavedArray.length === 0) {
    return [];
  }
  return interleavedArray;
};


let TextArray = [];

const ByText1 = async (req, res) => {
  // console.log("ByText1");
  

  try {

    const { id } = req.user;

    TextArray = (await getTextByCount(id));


    let ArticlesByText1 = (await ScrapForFeed(TextArray.slice(0, 2)));


    return res.status(202).json({ success: true, partialArticles: ArticlesByText1 });
  } catch (error) {
    console.error("Error fetching user feed:\n", error);
    return res.status(210).json({ message: "Internal Server Error" });
  }
};


const ByText2 = async (req, res) => {


  try {
    let ArticlesByText2 = (await ScrapForFeed(TextArray.slice(2, 4)));
    return res.status(202).json({ success: true, partialArticles: ArticlesByText2 });
  }
  catch (error) {
    console.error("Error fetching user feed:\n", error);
    return res.status(210).json({ message: "Internal Server Error" });
  }
}


const ByTopic1 = async (req, res) => {
  return { success: true, partialArticles: [] };
}


const ByText3 = async (req, res) => {


  try {
    let ArticlesByText3 = (await ScrapForFeed(TextArray.slice(4, 6)));
    return res.status(202).json({ success: true, partialArticles: ArticlesByText3 });
  }
  catch (error) {
    console.error("Error fetching user feed:\n", error);
    return res.status(210).json({ message: "Internal Server Error" });
  }
}


const ByText4 = async (req, res) => {


  try {
    let ArticlesByText4 = (await ScrapForFeed(TextArray.slice(6, 8)));
    return res.status(202).json({ success: true, partialArticles: ArticlesByText4 });
  }
  catch (error) {
    console.error("Error fetching user feed:\n", error);
    return res.status(210).json({ message: "Internal Server Error" });
  }
}





const ByTopic2 = async (req, res) => {
  return { success: true, partialArticles: [] };
}


// module.exports = { ByText1, ByText2, ByTopic1, ByText3, ByText4, ByTopic2 };

export { ByText1, ByText2, ByTopic1, ByText3, ByText4, ByTopic2 };
