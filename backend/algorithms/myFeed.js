const searchLocation_model = require('../models/msearchLocation');
const { ScrapForFeed } = require('../algorithms/ScrapForFeed');
const mongoose = require('mongoose');

const getMyFeed = async (req, res) => {

  try {
    const { id } = req.user;

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
      return res.status(210).json({ success: false, message: "No search history found for this user." });
    }

    const textArrayForCount = resultByCount.map(item => item.text);
    const textArrayForUpdatedAt = resultByUpdatedAt.map(item => item.text);

    const interleavedSet = new Set();  // Use a Set to avoid duplicates
    const maxLength = 11;  // Set maximum length

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

    // Convert the Set back to an array
    const interleavedArray = Array.from(interleavedSet);

    // Handle case if the interleavedArray is empty
    if (interleavedArray.length === 0) {
      return res.status(210).json({ success: false, message: "No unique search terms found." });
    }

    
    let AllArticles = (await ScrapForFeed(interleavedArray));
    
    for (let i = AllArticles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [AllArticles[i], AllArticles[j]] = [AllArticles[j], AllArticles[i]];
    }


    return res.status(202).json({ success: true, AllArticles });
  } catch (error) {
    console.error("Error fetching user feed:\n", error);
    return res.status(210).json({ message: "Internal Server Error" });
  }
};

module.exports = { getMyFeed };
