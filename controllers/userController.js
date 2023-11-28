const { User } = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find({}).populate({
        path: "friends",
        select: "-__v",
      });
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
