import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    isVerified: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
