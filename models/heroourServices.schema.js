var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const heroourServicesDetails = new Schema({
  maintitle: {
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
  mainImage: {
    type: String,
    required: true,
  },
  services: [
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
    },
  ],
});
var heroourServicesSchema = new Schema({
  heroOurServices: heroourServicesDetails,
});

module.exports = mongoose.model("heroourServices", heroourServicesSchema);
