const express = require("express");
const router = express.Router();
const {
	getRoom,
	createMessage,
	createRoom,
} = require("../controllers/roomController");

router.post("/create", createRoom);
router.route("/:roomID").get(getRoom).post(createMessage);

module.exports = router;
