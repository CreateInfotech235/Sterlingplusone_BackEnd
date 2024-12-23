var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const servicesPage = new Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
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
});

var servicesPageSchema = new Schema({
    servicesPage: servicesPage,

});

module.exports = mongoose.model("services", servicesPageSchema);

