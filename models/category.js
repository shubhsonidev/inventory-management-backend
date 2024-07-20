const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },

  { timestamps: true }
);

const category = mongoose.model("Category", categorySchema);

module.exports = category;
