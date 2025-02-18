var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var imageStoreSchema = new Schema({
  img: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
    unique: true,
  },
  altname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("imageStore", imageStoreSchema);
