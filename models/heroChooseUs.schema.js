var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const heroChooseUs = new Schema({
    maintitle: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    childImage: {
      type: String,
      required: true,
    },
    thirdImage: {
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
    details: [
      {
        img: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  });
var heroChooseUsSchema = new Schema({
    heroChooseUs: heroChooseUs,
});

module.exports = mongoose.model("heroChooseUs", heroChooseUsSchema );
