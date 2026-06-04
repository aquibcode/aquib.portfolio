import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000
    }
  },
  { timestamps: true }
);

const ContactMessage =
  mongoose.models.ContactMessage || mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;
