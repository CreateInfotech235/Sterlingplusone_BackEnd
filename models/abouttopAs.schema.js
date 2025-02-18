var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const abouttopAs = new Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  bgImage: {
    type: String,
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

var abouttopAsSchema = new Schema({
    abouttopAs: abouttopAs,
});

module.exports = mongoose.model("abouttopAs", abouttopAsSchema);

