var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const blogPageSection = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thought: {
    type: String,
    required: true,
  },
  subImage: {
    type: String,
    required: true,
  },
  subDescription: {
    type: String,
    required: true,
  },
  button: [
    {
      name: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  ],
  topCategory: [
    {
      name: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  ],
  galleryImage: [
    {
      type: String,
      required: true,
    },
  ],
});
var blogPageSectionSchema = new mongoose.Schema({
  blogPageSection: blogPageSection,
});

module.exports = mongoose.model("blogPageSection", blogPageSectionSchema);
