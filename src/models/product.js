import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    photos: {
      type: Array,
      required: [true, "photos are required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
      trim: true,
    },
    size: String,
    shape: String,
    colour: String,
    availability: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    rating: [],
    likedBy: [],
    cartedBy: [],
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", schema);
