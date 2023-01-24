require("dotenv").config();
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
const connect = async () => {
	console.log();
	client = await mongoose.connect(DB_URL);
	return client;
};

module.exports = connect;
