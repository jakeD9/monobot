const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
    moderator: { type: String, required: true},
    action: { type: String, required: true},
    user: { type: String, required: true},
    reason: { type: String, required: true},
    timestamp: { type: Date, required: true}
})

const Log = mongoose.model("Log", logSchema);

module.exports = Log;

