import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const TypeEnum = ["buy", "rent"];
const PropertyEnum = ["apartment", "house", "condo", "land"];

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    Description:{
      type: String,
    },
    images: {
      type: [String],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    bedroom: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: TypeEnum, 
      required: true,
    },
    property: {
      type: String,
      enum: PropertyEnum, 
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SavedPost',
      },
    ],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
