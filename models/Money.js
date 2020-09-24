const { Schema, model } = require("mongoose");

const schema = new Schema({
    money: { type: String, required: true },
    reason: { type: String, required: true },
    date: { type: String, required: true },
});

module.exports = model("Money", schema);
