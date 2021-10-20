var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
import routes from "./routes/routes";
// Gives us access to variables set in the .env file
// Middleware for request authentication.

	var app = express();
// Set up mongoose connection
//let dev_db_url = 'mongodb+srv://upkurs:dipPWu7rFz4LzGp7@upkurs-dttpu.mongodb.net/upkurs?retryWrites=true&w=majority';


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/uploads")));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000,
	})
);
app.use(cors());
app.use(
	require("express-session")({
		secret: "keyboard cat",
		resave: true,
		saveUninitialized: true,
	})
);


// We plugin our jwt strategy as a middleware so only verified users can access specified routes
routes(app);
module.exports = app;
