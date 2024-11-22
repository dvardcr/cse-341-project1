const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDatabase().db().collection('users').find().toArray();

        // If no users are found, return a 404 error message
        if (!result || result.length === 0) {
            return res.status(404).json('No users found');
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        // If an error occurs during the database query, return a 400 error
        res.status(400).json({ message: 'Error retrieving users', error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId }).toArray();

        // Check if user is found
        if (!result || result.length === 0) {
            return res.status(404).json('User not found');
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        // Handle database query or connection errors
        res.status(400).json({ message: 'Error retrieving user', error: err.message });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the user.')
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.')
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = req.params.id;

    // Validate if the provided id is a valid ObjectId
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    try {
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: new ObjectId(userId) });
        if (response.deletedCount > 0) {
            res.status(204).send(); // No Content
        } else {
            res.status(404).json({ error: 'User not found' }); // User not found
        }
    } catch (error) {
        console.error('Caught exception:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };