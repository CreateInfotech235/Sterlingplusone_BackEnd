var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const heroPlans = new Schema({
  maintitle: {
    type: String,
    required: true,
  },
  plan: [
    {
      img: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
      benifits: [
        {
          type: String,
          required: true,
        },
      ],
      button: [
        {
          name: {
            type: String,
            required: true,
          },
          link: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});
var heroPlansSchema = new Schema({
  heroPlans: heroPlans,
});

module.exports = mongoose.model("heroPlan", heroPlansSchema);
