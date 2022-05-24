// import dependencies
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

// set up stylesheets route

// TODO: Add server side code

app.get("/", homeHandler.getHome);
app.use("/room", require("./routes/roomRoutes"));

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () =>
	console.log(`Server listening on http://localhost:${port}`)
);
