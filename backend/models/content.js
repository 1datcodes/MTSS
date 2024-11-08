import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  pageName: { type: String, required: true, unique: true },
  content: { type: String, required: true },
});

const Content = mongoose.model("Content", ContentSchema);
export default Content;
