const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const initBooks = require('./book.json')
let books = initBooks;

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'))

app.post('/book', (req,res) =>{
    const book = req.body;

    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});
app.get('/books', (req,res)=>{
    res.json(books);
});
app.get('/book/:isbn',(req,res)=>{
    const isbn = req.params.isbn;
    for(let i = 0; i < books.length; i++){
        let book = books[i];

        if(book.isbn === isbn){
            res.json(book);
        }
    }
});
app.post('/book/:isbn',(req,res) =>{
    const isbn = req.params.isbn;
    const newBook = req.body;
    for (let i = 0; i < books.length; i++){
        let book = books[i];

        if(book.isbn === isbn){
            books[i] = newBook;
        }
    }
	res.send('book changed');
});
app.delete('/book/:isbn',(req,res) => {
    const isbn = req.params.isbn;
    for (let i = 0; i < books.length; i++){
        let book = books[i];

        if(book.isbn === isbn){
            books.splice(i,1);
        }
    }
})

app.listen(port,() => console.log(`Hello world app listening on port`));