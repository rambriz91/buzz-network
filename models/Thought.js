const { ObjectId } = require("bson");
const moment = require("moment");
const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
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
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", ThoughtSchema);

module.exports = Thought;
