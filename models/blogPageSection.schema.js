var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const blogPageSection = new Schema({

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
