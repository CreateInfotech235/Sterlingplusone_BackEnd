var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const footer = new Schema({
  section: [
    {
      title: {
        type: String,
        required: true,
      },
      list: [
        {
          name: {
            type: String,
            required: true,
          },
          isbtn: {
            type: Boolean,
            default: true,
          },
          link: {
            type: String,
            required: false
          }
        }
      ]
    },
  ],
  socialMedia: [
    {
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      }
    }
  ],
  copyright: {
    type: String,
    required: true,
  }
});

var footerSchema = new Schema({
  footer: footer,
});

module.exports = mongoose.model("footer", footerSchema);

