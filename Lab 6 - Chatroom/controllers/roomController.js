// Controller handler to handle functionality in room page

const roomGenerator = require("../util/roomIdGenerator.js");
const Chat = require("../models/chatModel");
const Room = require("../models/roomModel");

// @desc    Get all chats from a certain room
// @route   GET /room/:roomName
// @access  Public
const getRoom = async (req, res) => {
	// res.render("room", {
	// 	title: "chatroom",
	// 	roomName: req.params.roomName,
	// 	newRoomId: roomGenerator.roomIdGenerator(),
	// });

	// TODO: Find if a collection with roomName exists

	res.status(200).json({
		message: `Get all messages from room ${req.params.roomname}`,
	});
};

// @desc    Add a chat to a certain room
// @route   POST /room/:roomName
// @access  Public
const createMessage = async (req, res) => {
	// TODO: Add conditional to check if chatroom exists

	const newChat = await Chat.create({ ...req.body });

	res.status(200).json({ newChat });
};

// @desc    Creates a room with a roomname and roomid
// @route   POST /room/create
// @access  Public
const createRoom = async (req, res) => {
	const roomName = req.body.roomName;

	if (!roomName) {
		res.status(400);
		throw new Error("yikes");
	}

	const newRoom = await Room.create({
		roomName,
		roomID: roomGenerator.roomIdGenerator(),
	});

	res.status(200).json({
		message: "Created room",
		newRoom,
	});
};

module.exports = {
	getRoom,
	createMessage,
	createRoom,
};
