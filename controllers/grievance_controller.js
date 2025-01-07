import Ai from '../ai/model.js';
import models from '../models/index.js';

export const createGrievance = async (req, res) => {
    const { student, description } = req.body;

    try {
        const ai = new Ai();
        const prediction = ai.handleTextInput(description);
        const grievance = await models.Grievance.create({
            student: student,
            roles: prediction.roles,
            description: description,
            priority: prediction.priority,
            category: prediction.category,
        });

        res.json(grievance);
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`, error);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
}