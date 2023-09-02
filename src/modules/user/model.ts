import { Model, models, model, Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true }, // trim: "   john   " -> "john"
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (e) {
    throw e;
  }
});

// compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = models.User || model("User", userSchema);

export default UserModel as Model<UserDocument, {}, Methods>;
