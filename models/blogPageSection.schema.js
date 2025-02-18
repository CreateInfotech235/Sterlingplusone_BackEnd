var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const blogPageSideSection = new Schema({
  Categorytitle: {
    type: String,
    required: true,
  },
  topCategory: [
    {
      title: {
        type: String,
        required: true,
      },
      blogId: {
        type: String,
        required: true,
      }
    },
  ],
  gallerytitle: {
    type: String,
    required: true,
  },
  galleryImage: [
    {
      type: String,
      required: true,
    },
  ],
});
var blogPageSideSectionSchema = new mongoose.Schema({
  blogPageSideSection: blogPageSideSection,
});

module.exports = mongoose.model("blogPageSideSection", blogPageSideSectionSchema);
