const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,

} = require('../../controllers/userControllers.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;