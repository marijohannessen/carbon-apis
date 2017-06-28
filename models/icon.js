const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IconSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  tags: [String],
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  viewBox: {
    type: String,
    trim: true,
    required: true,
  },
  paths: {
    type: [String],
    required: true,
  },
  url: String,
  svgString: String,
});

module.exports = mongoose.model('Icon', IconSchema);
