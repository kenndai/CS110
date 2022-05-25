// Controller handler to handle functionality in room page

const roomGenerator = require("../util/roomIdGenerator.js");
const Chat = require("../models/chatModel");
const Room = require("../models/roomModel");

// @desc    Get all chats from a certain room
// @route   GET /room/:roomID
// @access  Public
const getRoom = async (req, res) => {
	// res.render("room", {
	// 	title: "chatroom",
	// 	roomName: req.params.roomName,
	// 	newRoomId: roomGenerator.roomIdGenerator(),
	// });

	const roomID = req.params.roomid;
	const chats = await Chat.find({ chatroomID: roomID });

	res.status(200).json({
		message: `Get all messages from room ${req.params.roomname}`,
		chats,
	});
};

// @desc    Add a chat to a certain room
// @route   POST /room/:roomID
// @access  Public
const createMessage = async (req, res) => {
	// TODO: Add conditional to check if chatroom exists
	// get corresponding id to roomname?
	const chatroomID = req.params.roomname;

	const newChat = await Chat.create({ ...req.body, chatroomID });

	res.status(200).json({ newChat });
};

// @desc    Creates a room with a roomname and roomid
// @route   POST /room/create
// @access  Public
const createRoom = async (req, res) => {
	const chatroomName = req.body.roomName;

	const foundRoom = await Room.findOne({});

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
