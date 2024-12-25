var mongoose = require("mongoose");

const { Schema } = mongoose;
const adminSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  nodemailerEmail: {
    type: String,
    default: this.email,
  },
  nodemailerPassword: {
    type: String,
    default: "",
  },
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin