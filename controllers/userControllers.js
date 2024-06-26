const { User, Thought } = require('../models');

module.exports = {

  // get users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .populate('thoughts');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // get user by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a User
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true } 
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: {friends: req.params.friendId} },
        { runValidators: true, new: true } 
      );

      if (!friend) {
        res.status(404).json({ message: 'No user with this id!' });
      }
      return res.status(200).json(friend)

    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {friends: { _id: req.params.friendId }}},
        { runValidators: true, new: true } 
      );

      if (!friend) {
        res.status(404).json({ message: 'No user with this id!' });
      }
      return res.status(200).json(friend)

    } catch (err) {
      res.status(500).json(err);
    }
  },
};
