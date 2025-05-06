import mongoose from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correct: { type: String, required: true },
});

const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;
