const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
		fullname: { type: String, required: true },
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: { type: String, required: true },
		role: {
			type: String,
			required: true,
			enum: ["admin", "user"],
			default: "user",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const UserModel = model("user", UserSchema);

module.exports = UserModel;
