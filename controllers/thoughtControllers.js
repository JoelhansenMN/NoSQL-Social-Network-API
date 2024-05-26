const { Thought, User } = require('../models');

module.exports = {

 
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
      //.populate('users');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      //.populate('users');

      if (!thought) {
        return res.status(404).json({ message: 'No course with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      res.json(thought);
    
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true } //allows mongoose to validate right before it updates the data base using what is listed in the models.  And in this instance its the course model 
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No course with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: {reactions: req.body} },
        { runValidators: true, new: true } 
      );

      if (!reaction) {
        res.status(404).json({ message: 'No thought with this id!' });
      }
      return res.status(200).json(reaction)

    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: {reactions: { _id: req.params.reactionId }}},
        { runValidators: true, new: true } 
      );

      if (!reaction) {
        res.status(404).json({ message: 'No thought with this id!' });
      }
      return res.status(200).json(reaction)

    } catch (err) {
      res.status(500).json(err);
    }
  },

};

