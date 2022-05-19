const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

let books = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/books", (req, res) => {
	res.json(books);
});

app.post("/book", (req, res) => {
	const book = req.body;

	console.log("book added");
	books.push(book);

	res.send("Book is added to the database");
});

app.listen(port, () => {
	console.log(`App is listening on ${port}`);
});
