import bcrypt from 'bcrypt';
import models from '../models/index.js';

// Register a new user
export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await models.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await models.User.create({ firstName, lastName, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
        console.error(`[REGISTER ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await models.User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(`[GET ALL USERS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await models.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(`[GET USER BY ID ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await models.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (email) updateData.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        await user.update(updateData);
        res.status(200).json({ message: 'User updated successfully.', user });
    } catch (error) {
        console.error(`[UPDATE USER ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await models.User.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error(`[DELETE USER ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Login a user
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await models.User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        res.status(200).json({ message: 'Login successful.', userId: user.id });
    } catch (error) {
        console.error(`[LOGIN ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Logout a user
export const logout = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await models.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Logout successful.' });
    } catch (error) {
        console.error(`[LOGOUT ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get user profile
export const profile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await models.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Profile retrieved successfully.', user });
    } catch (error) {
        console.error(`[PROFILE ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
