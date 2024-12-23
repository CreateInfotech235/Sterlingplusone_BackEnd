var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const contectUs = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

var contectUsSchema = new Schema({
  contectUs: contectUs,
});

module.exports = mongoose.model("contectUs", contectUsSchema);
