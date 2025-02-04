import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the UserDocument type which extends mongoose.Document
export type UserDocument = {
  _id?: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
};

// Define the User schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
});

// Pre-save hook to hash the password before saving the user document
UserSchema.pre("save", async function (next) {
  // If the password is not modified, move to the next middleware
  if (!this.isModified("password")) {
    return next();
  }

  // Generate a salt for hashing the password
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);

  // Move to the next middleware
  next();
});

export default mongoose.model<UserDocument>("User", UserSchema);
