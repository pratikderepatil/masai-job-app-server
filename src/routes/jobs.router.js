const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const JobsModel = require("../models/jobs.model");

const app = express.Router();

app.post("/", async (req, res) => {
	let { companyname, position, contract, location } = req.body;
	
	try {
		let newJob = new JobsModel({
			companyname,
			position,
			contract,
			location,
		});
		await newJob.save();
		return res.status(201).send(newJob);
	} catch (e) {
		return res.status(500).send(e.message);
	}
});

module.exports = app;
