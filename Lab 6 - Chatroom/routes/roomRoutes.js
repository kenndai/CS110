const express = require("express");
const router = express.Router();
const {
	getRoom,
	createMessage,
	createRoom,
} = require("../controllers/roomController");

router.route("/:roomname").get(getRoom).post(createMessage);
router.post("/create", createRoom);

module.exports = router;
