// import dependencies
<<<<<<< HEAD
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const roomIdGenerator = require('./util/roomIdGenerator.js');
const mongoose = require('mongoose');
const config = require('config');
const Room = require("./models/Rooms");
// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');
=======
const express = require("express");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");
const path = require("path");
const homeHandler = require("./controllers/homeController.js");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

// connects to mongoDB
connectDB();
>>>>>>> dd47a0cba80869b478f45138ae03bc16cd1f2694

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine(
	"hbs",
	hbs({
		extname: "hbs",
		defaultLayout: "layout",
		layoutsDir: __dirname + "/views/layouts/",
	})
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

const db = config.get('mongoURI');
mongoose.connect(db,
    err=>{
        if(err)throw err;
        console.group("Connected to MongoDB");
    });
// set up stylesheets route

// TODO: Add server side code

<<<<<<< HEAD
//createroom
app.post("/create", function (req,res){
    const newRoom = new Room ({
        name:req.body.roomName,
        id:roomIdGenerator.roomIdGenerator()
    })
    newRoom.save().then(console.log("Room has been added"))
        .catch(err =>console.log("Error when creating room"))
})
app.get('/getRoom', function (req,res){
    Room.find().lean().then(item =>{
        res.json(item);
    })
})
// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.get('/:roomName', roomHandler.getRoom);

//create endpoint - to create a new room in the database

//getRoom -return json of all rooms

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
=======
app.get("/", homeHandler.getHome);
app.use("/room", require("./routes/roomRoutes"));

app.listen(port, () =>
	console.log(`Server listening on http://localhost:${port}`)
);
>>>>>>> dd47a0cba80869b478f45138ae03bc16cd1f2694
