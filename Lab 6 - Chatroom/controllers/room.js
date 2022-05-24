// Controller handler to handle functionality in room page

const roomGenerator = require("../util/roomIdGenerator.js");

// Example for handle a get reqest at '/:roomName' endpoint.
const getRoom = (req, res) => {
	res.render("room", {
		title: "chatroom",
		roomName: req.params.roomName,
		newRoomId: roomGenerator.roomIdGenerator(),
	});
};

module.exports = {
	getRoom,
};
