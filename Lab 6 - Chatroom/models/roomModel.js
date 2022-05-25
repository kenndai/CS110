const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
	{
		roomName: {
			type: String,
			required: true,
		},
		roomID: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
