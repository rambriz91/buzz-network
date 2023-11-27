const { ObjectId } = require("bson");
const moment = require("moment");
const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: [280, "Reaction must be less than 280 characters"],
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => moment(date).format("YYYY-MM-DD HH:mm"),
  },
});

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
