const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [isEmail, "invalid email"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//virtual property for friendcount
userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});
// initializes the User model
const User = model("user", userSchema);

module.exports = User;
