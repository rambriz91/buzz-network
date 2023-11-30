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

// /api/thoughts/new/:userId
// create new thought
router.route("/new/:userId").post(createThought);

// /api/thoughts/remove-reaction/:thoughtId/:reactionId
// removes a reaction
router.route("/remove-reaction/:thoughtId/:reactionId").delete(deleteReaction);

// /api/thoughts/add-reaction/:userId/:thoughtId
// adds a reaction
router.route("/add-reaction/:userId/:thoughtId").post(addReaction);

module.exports = router;
