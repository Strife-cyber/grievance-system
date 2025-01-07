import Ai from '../ai/model.js';
import models from '../models/index.js';

// Create a new grievance
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

        res.status(201).json(grievance);
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`, error);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
};

// Get all grievances
export const getAllGrievances = async (req, res) => {
    try {
        const grievances = await models.Grievance.findAll({
            include: [models.Student, models.Appeal, models.Response], // Include related models
        });
        res.json(grievances);
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`, error);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
};

// Get a single grievance by ID
export const getGrievanceById = async (req, res) => {
    const { id } = req.params;

    try {
        const grievance = await models.Grievance.findByPk(id, {
            include: [models.Student, models.Appeal, models.Response], // Include related models
        });

        if (!grievance) return res.status(404).json({ message: 'Grievance not found.' });

        res.json(grievance);
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`, error);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
};

// Update an existing grievance
export const updateGrievance = async (req, res) => {
    const { id } = req.params;
    const { description, status } = req.body;

    try {
        const grievance = await models.Grievance.findByPk(id);

        if (!grievance) return res.status(404).json({ message: 'Grievance not found.' });

        await grievance.update({ description, status });

        res.json(grievance);
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`, error);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
};

// Delete a grievance
export const deleteGrievance = async (req, res) => {
    const { id } = req.params;

    try {
        const grievance = await models.Grievance.findByPk(id);

        if (!grievance) return res.status(404).json({ message: 'Grievance not found.' });

        await grievance.destroy();

        res.json({ message: 'Grievance deleted successfully.' });
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`, error);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
};

// Get all appeals for a specific grievance
export const getAppealsForGrievance = async (req, res) => {
    const { grievanceId } = req.params;

    try {
        const appeals = await models.Appeal.findAll({
            where: { grievance: grievanceId },
        });

        res.json(appeals);
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`, error);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
};

// Get all responses for a specific grievance
export const getResponsesForGrievance = async (req, res) => {
    const { grievanceId } = req.params;

    try {
        const responses = await models.Response.findAll({
            where: { grievance: grievanceId },
        });

        res.json(responses);
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`, error);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
};
