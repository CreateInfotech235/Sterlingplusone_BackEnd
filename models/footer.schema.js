var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const footer = new Schema({
  section: [
    {
      title : {
        type: String,
        required: true,
      },
      button : [
        {
            name : {
                type: String,
                required: true,
            },
            link : {
                type: String,
                required: true,
            }
        }
      ]
    },
  ],
  socialMedia : [
    {
        name : {
            type: String,
            required: true,
        },
        icon : {
            type: String,
            required: true,
        },
        link : {
            type: String,
            required: true,
        }
    }
  ],
  copyright : {
    type: String,
    required: true,
  }
});

var footerSchema = new Schema({
  footer: footer,
});

module.exports = mongoose.model("footer", footerSchema);

