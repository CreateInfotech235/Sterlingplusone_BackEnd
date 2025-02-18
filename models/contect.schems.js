var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const contactPage = new Schema({
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
  image: {
    type: String,
    required: true,
  },
  box:[
    {
      icon: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    }
  ]
});

var contactSchema = new Schema({
  contactPage: contactPage,
});

module.exports = mongoose.model("contact", contactSchema);
