const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtControllers.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/thoughtId/reactions/:reactionId').delete(deleteReaction)


// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;