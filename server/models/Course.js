import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },

    description: {
      type: String,
      required: [true, "Please provide a description"],
    },

    category: {
      type: String,
      required: [true, "Please provide a category"],
    },

    thumbnail: {
      public_id: {
        type: String,
        required: true
      },
      secure_url: {
        type: String,
        required: true,
      },
    },

    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id:{
            type: String,
            required: true
          },
          secure_url: {
            type: String,
            required: true
          }
        },
      },
    ],

    numberOfLectures: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: String,
      required: [true, "Please provide a createdBy"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);
