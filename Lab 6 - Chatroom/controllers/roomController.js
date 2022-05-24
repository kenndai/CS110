// Controller handler to handle functionality in room page

const roomGenerator = require("../util/roomIdGenerator.js");
const Chat = require("../models/chatModel");

// @desc    Get all chats from a certain room
// @route   GET /room/:roomName
// @access  Public
const getRoom = (req, res) => {
	// res.render("room", {
	// 	title: "chatroom",
	// 	roomName: req.params.roomName,
	// 	newRoomId: roomGenerator.roomIdGenerator(),
	// });
	res.status(200).json({
		message: `Get all messages from room ${req.params.roomName}`,
	});
};

// @desc    Add a chat to a certain room
// @route   POST /room/:roomName
// @access  Public
const createMessage = (req, res) => {
	// res.render("room", {
	// 	title: "chatroom",
	// 	roomName: req.params.roomName,
	// 	newRoomId: roomGenerator.roomIdGenerator(),
	// });
	res.status(200).json({
		message: `Create new message to room ${req.params.roomName}`,
	});
};

// @desc    Creates a room with a roomname and roomid
// @route   POST /room/create
// @access  Public
const createRoom = (req, res) => {
	res.status(200).json({ message: "Created room" });
};

module.exports = {
	getRoom,
	createMessage,
	createRoom,
};
