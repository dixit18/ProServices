import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      requires: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requires: true,
    },
    desc: {
      type: String,
      requires: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);
