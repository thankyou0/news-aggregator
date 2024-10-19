const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const searchLocationSchema = new Schema(
  {
    user_id:
    {
      type: Types.ObjectId,
      required: true, ref: "User"
    },

    searchText:
      [
        {
          text: { type: String, required: true },
          count: { type: Number, default: 1, min: 0 },
          updatedAt: { type: Date, default: Date.now },
        },
      ],
  },
  { timestamps: true }
);

const searchLocation_model = model("searchLocation", searchLocationSchema);

module.exports = searchLocation_model;
