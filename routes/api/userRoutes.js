const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../../controllers/userController.js");

// /api/users
// get all and post route
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
//single user, delete, and put routes
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

module.exports = router;
