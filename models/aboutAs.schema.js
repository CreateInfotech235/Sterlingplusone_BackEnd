var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const aboutAs = new Schema({
  mainTitle: {
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
  contectNumber: {
    type: String,
    required: true,
  },
  achievements: [
    {
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
  image: {
    type: String,
    required: true,
  },
  infoTitle: {
    type: String,
    required: true,
  },
  infoDescription: {
    type: String,
    required: true,
  },
  services: [
    {
        title: {
            type: String,
            required: true,
        },
        servicePersantage: {
            type: String,
            required: true,
        },
    }
  ],
});

var aboutAsSchema = new Schema({
    aboutAs: aboutAs,

});

module.exports = mongoose.model("aboutAs", aboutAsSchema);


