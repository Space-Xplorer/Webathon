const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  events_conducted : [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]

});

module.exports = mongoose.model("organiser", userSchema);