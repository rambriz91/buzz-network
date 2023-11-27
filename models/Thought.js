const { ObjectId } = require("bson");
const moment = require("moment");
const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: [1, "Thought must have at least one character"],
    maxLength: [280, "Thought must be less than 280 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => moment(date).format("YYYY-MM-DD HH:mm"),
  },
  username: { type: String, required: true },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "reaction",
    },
  ],
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
