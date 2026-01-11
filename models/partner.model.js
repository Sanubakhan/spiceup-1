const mongoose = require("mongoose");
const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    },
    
}, { timestamps: true });

const Partner = mongoose.model("Partner", partnerSchema);
module.exports = Partner;