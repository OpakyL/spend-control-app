const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    nickname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    earnings: [{ type: Types.ObjectId, ref: "Earning" }],
    expenses: [{ type: Types.ObjectId, ref: "Expense" }],
});

module.exports = model("User", schema);
