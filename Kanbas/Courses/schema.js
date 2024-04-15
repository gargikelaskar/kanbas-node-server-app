import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    image: String,
    startDate: Date,
    endDate: Date,
  },
  { collection: "courses" }
);

export default courseSchema;
