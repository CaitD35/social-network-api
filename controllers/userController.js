const { User } = require('../models');

module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .populate({
                path: 'friends',
                select: '-__v',
            })  
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            }
        );
    },
    // create a user
    createUser({ body }, res) {
        User.create(body) 
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.json(err));
    },
    // update a user by id
    updateUser({ params, body }, res) {
      User.findOneandUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } 
      )
      .catch((err) => res.json(err));
    },
    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }  
                res.json(dbUserData);
            }
        )
        .catch((err) => res.status(400).json(err));
    },
    // add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        ) 
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }  
            res.json(dbUserData);
        }
        )
        .catch((err) => res.json(err));
    },
    // remove a friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }  
            res.json(dbUserData);
        }
        )
        .catch((err) => res.json(err));
    }

};