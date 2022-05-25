const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
	{
		roomName: {
			type: String,
			required: [true, "Please enter a room name"],
		},
		roomID: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
