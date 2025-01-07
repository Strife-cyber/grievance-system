import express from 'express';
import jwt from "jsonwebtoken";
import * as userController from './controllers/user_controller.js';

const routes = express.Router();

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token is required for authentication.' });
    }

    try {
        // Verify the token with the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Store decoded info (e.g., user ID) in the request object
        next();  // Proceed to the next middleware/handler
    } catch (error) {
        console.error(`[JWT ERROR]: ${error.message}`);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
}

// User Routes
routes.post('/register', userController.register);
routes.post('/login', userController.login);

// You don't need the :id in logout because JWT will handle the authentication
routes.post('/logout', authenticateJWT, userController.logout); 

routes.get('/users', authenticateJWT, userController.getAllUsers); 

// Profile and update routes now don't require :id because it will be taken from the JWT token
routes.get('/profile', authenticateJWT, userController.profile);
routes.put('/users', authenticateJWT, userController.updateUser);
routes.get('/role', authenticateJWT, userController.getUserRole);
routes.delete('/users', authenticateJWT, userController.deleteUser);

export default routes;
