// Controller handler to handle functionality in room page

const roomGenerator = require("../util/roomIdGenerator.js");
const Chat = require("../models/chatModel");

// @desc    Get all chats from a certain room
// @route   GET /room/:roomName
// @access  Public
const getRoom = async (req, res) => {
	// res.render("room", {
	// 	title: "chatroom",
	// 	roomName: req.params.roomName,
	// 	newRoomId: roomGenerator.roomIdGenerator(),
	// });

	// TODO: Get messages by chatroomName, i.e. chats within a room, sort messages chronologically
	const messages = await Chat.find({ chatroomName: req.params.roomname });

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

	res.status(200).json({
		message: "Created room",
		roomName,
		roomID: `${roomGenerator.roomIdGenerator()}`,
	});
};

module.exports = {
	getRoom,
	createMessage,
	createRoom,
};
