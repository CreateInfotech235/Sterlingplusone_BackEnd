var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ourPartnerSection = new Schema({
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
  },
});

var ourPartnerSchema = new Schema({
    ourPartnerSection: ourPartnerSection,
});

module.exports = mongoose.model("ourPartner", ourPartnerSchema);
