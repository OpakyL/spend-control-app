const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    nickname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    earnings: [{ type: Object, ref: "Money" }],
    expenses: [{ type: Object, ref: "Money" }],
});

module.exports = model("User", schema);
