const mongoose = require("mongoose");

const message = new mongoose.Schema(
    {
        conversation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', select: false}],
        message: { type: mongoose.Schema.Types.Array, select: false}
    },
    {
        collection: "message"
    }
)

module.exports = mongoose.model("message", message);