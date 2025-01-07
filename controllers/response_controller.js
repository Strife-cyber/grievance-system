import models from '../models/index.js';

export const createResponse = async (req, res) => {
    const { userId } = req.user;
    const { grievance, message } = req.body;
    const staff = userId;

    try {
        // Validate input
        if (!grievance || !staff || !message) {
            return res.status(400).json({ message: 'Grievance, staff ID, and message are required.' });
        }

        // Ensure grievance and staff exist
        const grievanceExists = await models.Grievance.findByPk(grievance);
        if (!grievanceExists) {
            return res.status(404).json({ message: 'Grievance not found.' });
        }

        const staffExists = await models.Staff.findByPk(staff);
        if (!staffExists) {
            return res.status(404).json({ message: 'Staff member not found.' });
        }

        // Create the response
        const response = await models.Response.create({ grievanceId: grievance, staffId: staff, message });

        res.status(201).json({
            message: 'Response created successfully.',
            response,
        });
    } catch (error) {
        console.error(`[CREATE RESPONSE ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while creating the response.', error: error.message });
    }
};

export const getAllResponses = async (req, res) => {
    try {
        const responses = await models.Response.findAll({
            include: [
                {
                    model: models.Staff,
                    attributes: ['id', 'role', 'course'],
                    include: { model: models.User, attributes: ['firstName', 'lastName', 'email'] }, // Include user details of the staff
                },
                {
                    model: models.Grievance,
                },
            ],
        });

        res.json(responses);
    } catch (error) {
        console.error(`[GET ALL RESPONSES ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching responses.' });
    }
};

export const getResponseById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await models.Response.findByPk(id, {
            include: [
                {
                    model: models.Staff,
                    attributes: ['id', 'role', 'course'],
                    include: { model: models.User, attributes: ['firstName', 'lastName', 'email'] }, // Include user details of the staff
                },
                {
                    model: models.Grievance,
                },
            ],
        });

        if (!response) return res.status(404).json({ message: 'Response not found.' });

        res.json(response);
    } catch (error) {
        console.error(`[GET RESPONSE BY ID ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching the response.' });
    }
};

export const updateResponse = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    try {
        const response = await models.Response.findByPk(id);

        if (!response) return res.status(404).json({ message: 'Response not found.' });

        // Update message if provided
        if (message) response.message = message;

        await response.save();

        res.status(200).json({
            message: 'Response updated successfully.',
            response,
        });
    } catch (error) {
        console.error(`[UPDATE RESPONSE ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while updating the response.' });
    }
};

export const deleteResponse = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await models.Response.destroy({ where: { id } });

        if (!deleted) return res.status(404).json({ message: 'Response not found.' });

        res.status(204).send(); // No content response
    } catch (error) {
        console.error(`[DELETE RESPONSE ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while deleting the response.' });
    }
};

export const getResponsesForGrievance = async (req, res) => {
    const { grievanceId } = req.params;

    try {
        const responses = await models.Response.findAll({
            where: { grievanceId },
            include: [
                {
                    model: models.Staff,
                    attributes: ['id', 'role', 'course'],
                    include: { model: models.User, attributes: ['firstName', 'lastName', 'email'] }, // Include user details of the staff
                },
            ],
        });

        if (!responses || responses.length === 0)
            return res.status(404).json({ message: 'No responses found for this grievance.' });

        res.json(responses);
    } catch (error) {
        console.error(`[GET RESPONSES FOR GRIEVANCE ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching responses for the grievance.' });
    }
};
