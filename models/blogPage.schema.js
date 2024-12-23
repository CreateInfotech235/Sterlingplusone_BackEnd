var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const blogPage = new Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  button: {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
});

var blogPageSchema = new Schema({
  blogPage: blogPage,
});

module.exports = mongoose.model("blog", blogPageSchema);
