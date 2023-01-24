const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const app = express.Router();

const bcryptPassword = async (password) => {
	return await bcrypt.hash(password, 10);
};

const secrectToken = process.env.SECRECTTOKEN;

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
		const token = jwt.sign(
			{
				fullname: user.fullname,
				role: user.role,
				email: user.email,
			},
			secrectToken,
			{ expiresIn: "7 days" }
		);
		return res.status(200).send({
			message: "Login Success",
			token,
		});
	} else {
		return res.status(401).send("invalid credentials");
	}
});

module.exports = app;
