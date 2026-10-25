const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    destination: {
      type: String,
      required: true,
      trim: true
    },

    startDate: {
      type: String,
      required: true
    },

    endDate: {
      type: String,
      required: true
    },

    travellers: {
      type: Number,
      required: true,
      min: 1
    },

    budget: {
      type: Number,
      required: true,
      min: 0
    },

    preferences: {
      type: String
    },

    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

tripSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Trip", tripSchema);