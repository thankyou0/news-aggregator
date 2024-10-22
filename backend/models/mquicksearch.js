const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const quickSearchSchema = new Schema(
  {
    user_id:
    {
      type: Types.ObjectId,
      required: true, ref: "User"
    },

    quickSearchText:
      [
        {
          type: String,
          required: true
        }
      ]
  },
  { timestamps: true }
);

const quickSearch_model = model("quicksearch", quickSearchSchema);

module.exports = quickSearch_model;
