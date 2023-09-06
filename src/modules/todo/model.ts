import { Model, models, model, Document, Schema, Types } from "mongoose";

interface TodoDocument extends Document {
  userId: Types.ObjectId;
  title?: string;
  content: string;
  isDone: boolean;
}

const todoSchema = new Schema<TodoDocument, {}, {}>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    content: { type: String, required: true },
    isDone: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const TodoModel = models.Todo || model("Todo", todoSchema);

export default TodoModel as Model<TodoDocument, {}, {}>;
