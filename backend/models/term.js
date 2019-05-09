const mongoose = require("mongoose");

const termSchema = mongoose.Schema({
  title: { type: String, required: true },
  volume: { type: Number, required: true },
  imageURL: { type: String, required: true }
});

module.exports = mongoose.model("Term", termSchema);
