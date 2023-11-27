const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);

module.exports = router;
