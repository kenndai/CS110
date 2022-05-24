const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
	{
		chatroomID: {
			type: String,
			required: [true, "Chatroom ID needed"],
		},
		author: {
			type: String,
			require: [true, "Please enter the author of the chat"],
		},
		text: {
			type: String,
			required: [true, "Text content needed"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
