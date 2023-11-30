const { User, Thought } = require("../models");

module.exports = {
  // displays all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({}).populate({
        path: "reactions",
        select: "-__v",
      });
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //display single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).populate({
        path: "reactions",
        select: "-__v",
      });
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID found!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "could not find thought with that id!" });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.id },
        { $pull: { thoughts: req.params.id } },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought deleted, but no associated user found!" });
      }
      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //create thought
  async createThought(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      const thought = await Thought.create({
        ...req.body,
        username: user.username,
      });
      await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json({ message: "Thought created!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "Could not find thought with that ID!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //add a reaction
  async addReaction(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: { ...req.body, username: user.username } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with that id found!" });
      }
      res.json({ message: "Reaction added to thought!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).res.json({ message: "Invalid thought Id" });
      }
      res.json({ message: "Reaction removed!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
