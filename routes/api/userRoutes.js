const router = require('express').Router();

// Set up GET all and POST at /api/users
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
  
}
= require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:userId/friends")').post(addFriend);

router.route('/:userId/friends/:friendId').delete(removeFriend);


module.exports = router;



