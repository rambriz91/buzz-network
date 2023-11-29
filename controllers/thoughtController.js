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
      if (!thought) res.json(thought);
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
        { thoughts: params.id },
        { $pull: { thoughts: params.id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({'Thought deleted, but no associated user found!'})
      }
      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //create thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
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
};
