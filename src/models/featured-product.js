import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: [true, "product id is required"],
    },
    photo: {
      type: String,
      required: [true, "product photo is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const FeaturedProduct = mongoose.model("featured-product", schema);
