var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const servicesPageSection = new Schema(
  {
    services: [
      {
        img: {
          type: String,
          required: true,
        },
        title: {
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
      }
    ],
  }
);
var servicesPageSectionSchema = new Schema({
  servicesPageSection: servicesPageSection,
});

module.exports = mongoose.model(
  "servicesPageSection",
  servicesPageSectionSchema
);
