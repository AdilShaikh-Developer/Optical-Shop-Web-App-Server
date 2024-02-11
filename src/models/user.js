import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "id is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      unique: [true, "email adress already exist"],
      required: [true, "email is required"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "profile photo is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    // gender: {
    //   type: String,
    //   enum: ["male", "female"],
    //   required: [true, "gender is required"],
    // },
    // dob: {
    //   type: Date,
    //   required: [true, "date of birth is required"],
    // },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);
