const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
	{
		chatroomID: {
			type: String,
			required: [true, "Chatroom ID needed"],
		},
		author: {
			type: String,
			require: [true, "Please enter the author of the message"],
		},
		message: {
			type: String,
			required: [true, "Message content needed"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
