import express from 'express';
import jwt from "jsonwebtoken";
import * as userController from './controllers/user_controller.js';
import * as staffController from './controllers/staff_controller.js';
import * as appealController from './controllers/appeal_controller.js';
import * as studentController from './controllers/student_controller.js';
import * as responseController from './controllers/response_controller.js'; 
import * as grievanceController from './controllers/grievance_controller.js';

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

const isAuthStudent = async (req, res, next) => {
    const { userId } = req.user;

    if (await userController.isStudent(userId)) {
        next();
    } else {
        console.error(`[AUTHORIZATION ERROR]: User is not a student`);
        return res.status(401).json({ message: 'You cannot access this resource' });
    }
}

const isAuthStaff = async (req, res, next) => {
    const { userId } = req.user;

    if (await userController.isStaff(userId)) {
        next();
    } else {
        console.error(`[AUTHORIZATION ERROR]: User is not a staff`);
        return res.status(401).json({ message: 'You cannot access this resource' });
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



// Student Routes
routes.post('/students', authenticateJWT, studentController.registerStudent);

routes.get('/students', authenticateJWT, studentController.getAllStudents);
routes.get('/student', authenticateJWT, isAuthStudent, studentController.getStudentById);

routes.put('/students', authenticateJWT, isAuthStudent, studentController.updateStudent);
routes.delete('/students', authenticateJWT, isAuthStudent, studentController.deleteStudent);

routes.get('/students/appeals', authenticateJWT, isAuthStudent, studentController.getStudentAppeals);
routes.get('/students/grievances', authenticateJWT, isAuthStudent, studentController.getStudentGrievances);




// Staff Routes
routes.post('/staff', authenticateJWT, staffController.registerStaff);

routes.get('/staff', authenticateJWT, staffController.getAllStaff);
routes.get('/member', authenticateJWT, isAuthStaff, staffController.getStaffById);

routes.put('/staff', authenticateJWT, isAuthStaff, staffController.updateStaff);
routes.delete('/staff', authenticateJWT, isAuthStaff, staffController.deleteStaff);

routes.get('/staff/responses', authenticateJWT, isAuthStaff, staffController.getStaffResponses);



// Grievance Routes
routes.post('/grievances', authenticateJWT, isAuthStudent, grievanceController.createGrievance);

routes.get('/grievances', authenticateJWT, grievanceController.getAllGrievances);
routes.get('/grievances/:id', authenticateJWT, grievanceController.getGrievanceById);

routes.put('/grievances/:id', authenticateJWT, grievanceController.updateGrievance);
routes.delete('/grievances/:id', authenticateJWT, grievanceController.deleteGrievance);

routes.get('/:grievanceId/appeals', authenticateJWT, grievanceController.getAppealsForGrievance);
routes.get('/:grievanceId/responses', authenticateJWT, grievanceController.getResponsesForGrievance);



routes.post('/responses', authenticateJWT, isAuthStaff, responseController.createResponse);
routes.get('/responses', authenticateJWT, responseController.getAllResponses);
routes.get('/responses/:id', authenticateJWT, responseController.getResponseById);
routes.put('/responses/:id', authenticateJWT, isAuthStaff, responseController.updateResponse);
routes.delete('/responses/:id', authenticateJWT, isAuthStaff, responseController.deleteResponse);



routes.post('/appeals', authenticateJWT, isAuthStudent, appealController.createAppeal);
routes.get('/appeals', authenticateJWT, appealController.getAllAppeals); 
routes.get('/appeals/:id', authenticateJWT, appealController.getAppealById);
routes.put('/appeals/:id', authenticateJWT, isAuthStaff, appealController.updateAppealStatus);
routes.delete('/appeals/:id', authenticateJWT, isAuthStaff, appealController.deleteAppeal);

export default routes;
