const { Schema, model } = require("mongoose");

const JobsSchema = new Schema(
	{
		companyname: { type: String, required: true },
		position: { type: String, required: true },
		contract: { type: String, required: true },
		location: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const JobsModel = model("jobs", JobsSchema);

module.exports = JobsModel;


