const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect("mongodb+srv://altris:LWHtvKMUFO4lG7F0@cs110.hfblh.mongodb.net/?retryWrites=true&w=majority"
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
