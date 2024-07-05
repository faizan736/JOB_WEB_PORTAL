const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();

// MongoDB Connection
const dbURI = process.env.MONGO_URI || require("./config/keys").mongoURI;

mongoose
	.connect(dbURI)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

// Initialising directories
if (!fs.existsSync("./public")) {
	fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
	fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
	fs.mkdirSync("./public/profile");
}

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server started on http://0.0.0.0:${PORT}!`);
});
