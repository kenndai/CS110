const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			"mongodb+srv://kennydai:71locker17@chatroom.6vn8d.mongodb.net/chats?retryWrites=true&w=majority"
		);
		console.log(
			`MongoDB Connected: ${conn.connection.host}`.cyan.underline
		);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = connectDB;
