const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  deleteThought,
  updateThought,
  createThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
// get all thoughts
router.route("/").get(getThoughts);

// /api/thoughts/:thoughtId
// get single thought by id, delete thought, and update thought
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

// /api/thoughts/new-thought/:userId
// create new thought
router.route("/new-thought/:userId").post(createThought);

// /api/thoughts/:thoughtId/remove-reaction/:reactionId
// removes a reaction
router.route(":thoughtId/remove-reaction/:reactionId").delete(deleteReaction);

// /api/thoughts/:userId/add-reaction/:thoughtId
// adds a reaction
router.route("/:userId/add-reaction/:thoughtId").post(addReaction);

module.exports = router;
