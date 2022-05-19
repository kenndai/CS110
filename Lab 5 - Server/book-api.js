const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

let books = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get all books
app.get("/books", (req, res) => {
	res.json(books);
});

// get a book by isbn
app.get("/book/:isbn", (req, res) => {
	const { isbn } = req.params;
	const foundBook = books.find(book => book.isbn === isbn);
	res.json(foundBook);
});

// create new book
app.post("/book", (req, res) => {
	const book = req.body;

	console.log("book added");
	books.push(book);

	res.send("Book is added to the database");
});

// update a book
app.post("/book/:isbn", (req, res) => {
	const isbn = req.params.isbn;
	const newBook = req.body;

	for (let i = 0; i < books.length; i++) {
		let book = books[i];
		if (book.isbn === isbn) books[i] = newBook;
	}

	res.send("Book is edited");
});

app.delete("/book/:isbn", (req, res) => {
	const { isbn } = req.params;
	books = books.filter(book => book.isbn !== isbn);
	res.send("Book was deleted");
	res.redirect("/books");
});

app.listen(port, () => {
	console.log(`App is listening on ${port}`);
});
