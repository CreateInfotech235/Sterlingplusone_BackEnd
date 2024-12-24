var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ourPartnerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ourPartnerSection: [{
    img: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    }
  }]
});

module.exports = mongoose.model("ourPartner", ourPartnerSchema);
