var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var navBarSchema = new Schema({
  title: String,
  icons: [
    {
      name: String,
      Image: String,
      link: String,
    },
  ],
});

module.exports = mongoose.model("navBars", navBarSchema);
