const mongoose = require("mongoose");

const studioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Studio name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, "Size is required"],
      min: 0,
    },
    beds: {
      type: Number,
      required: true,
      default: 1,
    },
    baths: {
      type: Number,
      required: true,
      default: 1,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    longDescription: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    features: [
      {
        type: String,
      },
    ],
    amenities: [
      {
        type: String,
      },
    ],
    available: {
      type: String,
      required: true,
      default: "Now",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["available", "pending", "rented"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
studioSchema.index({ location: 1 });
studioSchema.index({ featured: -1 });
studioSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Studio", studioSchema);
