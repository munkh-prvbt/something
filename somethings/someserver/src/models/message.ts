import mongoose from "mongoose";

export interface Message extends mongoose.Document {
  content: string;
  username: string;
  timestamp: Date;
}

export const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  username: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

export const MessageModel = mongoose.model<Message>(
  "Message",
  MessageSchema,
  "Messages"
);
