const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const app = express.Router();

const bcryptPassword = async (password) => {
	return await bcrypt.hash(password, 10);
};

const compareBcryptPassword = async (password, passwordHash) => {
	return await bcrypt.compare(password, passwordHash);
};

app.post("/signup", async (req, res) => {
	let { email, password, fullname } = req.body;

	let user = await UserModel.findOne({ email });
	try {
		if (user) {
			return res
				.status(409)
				.send("This email is already in use try with other email.");
		}

		const domain = email.split("@");
		let role = "user";
		if (domain[1] === "masaischool.com") {
			role = "admin";
		}
		let newUser = new UserModel({
			email,
			password: await bcryptPassword(password),
			fullname,
			role,
		});
		await newUser.save();
		return res.status(201).send(newUser);
	} catch (e) {
		return res.status(500).send(e.message);
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email });
	if (user && (await compareBcryptPassword(password, user.password))) {
		return res.status(200).send({
			message: "Login Success",
			email: user.email,
		});
	} else {
		return res.status(401).send("invalid credentials");
	}
});

app.post("/getProfile", async (req, res) => {
	const { email } = req.body;
	const user = await UserModel.findOne({ email });
	if (user) {
		res.status(200).send({ email: user.email, name: user.name });
	}
});

module.exports = app;
