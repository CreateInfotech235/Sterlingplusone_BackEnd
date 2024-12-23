var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const heroSection = new Schema({
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
  marqueeList: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

var heroSchema = new Schema({
  heroSectionData: heroSection,
});

module.exports = mongoose.model("Hero", heroSchema);
