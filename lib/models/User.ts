// lib/models/User.ts
import mongoose from "mongoose";

// Define the User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    default: "" // Default empty string instead of required
  },
  lastName: {
    type: String,
    default: "" // Default empty string instead of required
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationCode: {
    type: String
  },
  verificationCodeExpires: {
    type: Date
  },
  location: {
    type: String,
    default: ""
  },
  program: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  disabled: {
    type: String,
    default: ""
  },
  amountPaid: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ""
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

// This runs before saving a document to set default values
UserSchema.pre('save', function(next) {
  // If username is not provided, use email prefix
  if (!this.username) {
    this.username = this.email.split('@')[0];
  }
  next();
});

// Check if the model exists before creating a new one
// This prevents the "OverwriteModelError" when the app hot reloads
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;