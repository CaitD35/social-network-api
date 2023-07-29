const router = require('express').Router();
// Set up GET all and POST at /api/thoughts
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');
// Set up GET all and POST at /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
// Set up POST at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);
// Set up DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
