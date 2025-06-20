const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    startingPrice: {
      type: Number,
      required: true,
    },
  
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
