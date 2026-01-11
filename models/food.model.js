const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    },
    description: {
    type: String,
    required: true,
    trim: true,
    },
    vedioUrl: {
    type: String,
    required: true
    },

    foodpartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner",
    required: true
    },
}, { timestamps: true });

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
