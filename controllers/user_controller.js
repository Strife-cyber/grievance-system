import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import models from '../models/index.js';

dotenv.config();

// Register a new user
export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if email already exists
        const existingUser = await models.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        // Hash the password securely with bcrypt
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

        // Create new user in the database
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
    const { userId } = req.user;
    const id = userId;
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
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
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
    const { userId } = req.user;
    const id = userId;

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

        // Check if user exists
        const user = await models.User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET, // Use the secret from .env
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } // Use expiry from .env
        );

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        console.error(`[LOGIN ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Logout a user (clear token on client side)
export const logout = async (req, res) => {
    try {
        // No backend session to clear, just inform the client to discard the token
        res.status(200).json({ message: 'Logout successful.' });
    } catch (error) {
        console.error(`[LOGOUT ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get user profile
export const profile = async (req, res) => {
    const { userId } = req.user;
    const id = userId;

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

export const isStudent = async (id) => {
    const student = await models.Student.findOne({ where: { id: id } });
    if (student) {
        return true;
    }
    return false;
} 

export const isStaff = async (id) => {
    const staff = await models.Staff.findOne({ where: { id: id } });
    if (staff) {
        return true;
    }
    return false;
}

// Get the user's role (student or staff) based on the table they belong to
export const getUserRole = async (req, res) => {
    const { userId } = req.user;

    try {
        // Check if the user is a student
        if (await isStudent(userId)) {
            res.status(200).json({ role: 'student' });
        }

        // If not student, check if the user is a staff
        if (await isStaff(userId)) {
            res.status(200).json({ role: 'staff' });
        }

        // If user is not found in either table, return a message indicating no role
        return res.status(200).json({ role: 'none' }); // Indicating that the user has no role
    } catch (error) {
        console.error(`[GET USER ROLE ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

