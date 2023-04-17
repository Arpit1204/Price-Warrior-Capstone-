const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    // required: true,
    trim: true,
  },
  password: {
    type: String,
    Number,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
  },
  withGoogle: {
    type: Boolean,
    trim: true,
  },
});

const ChannelModel = mongoose.model("userDetail", userModel);

module.exports = ChannelModel;
