import models from '../models/index.js';

export const createAppeal = async (req, res) => {
    const { student, grievance, reason } = req.body;

    try {
        // Validate input
        if (!student || !grievance || !reason) {
            return res.status(400).json({ message: 'Student ID, grievance ID, and reason are required.' });
        }

        // Ensure student and grievance exist
        const studentExists = await models.Student.findByPk(student);
        if (!studentExists) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        const grievanceExists = await models.Grievance.findByPk(grievance);
        if (!grievanceExists) {
            return res.status(404).json({ message: 'Grievance not found.' });
        }

        // Create the appeal
        const appeal = await models.Appeal.create({ student, grievance, reason });

        res.status(201).json({
            message: 'Appeal created successfully.',
            appeal,
        });
    } catch (error) {
        console.error(`[CREATE APPEAL ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while creating the appeal.', error: error.message });
    }
};

export const getAllAppeals = async (req, res) => {
    try {
        const appeals = await models.Appeal.findAll({
            include: [
                {
                    model: models.Student,
                    attributes: ['id', 'course'],
                    include: { model: models.User, attributes: ['firstName', 'lastName', 'email'] }, // Include user details of the student
                },
                {
                    model: models.Grievance,
                },
            ],
        });

        res.json(appeals);
    } catch (error) {
        console.error(`[GET ALL APPEALS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching appeals.' });
    }
};

export const getAppealById = async (req, res) => {
    const { id } = req.params;

    try {
        const appeal = await models.Appeal.findByPk(id, {
            include: [
                {
                    model: models.Student,
                    attributes: ['id', 'course'],
                    include: { model: models.User, attributes: ['firstName', 'lastName', 'email'] }, // Include user details of the student
                },
                {
                    model: models.Grievance,
                },
            ],
        });

        if (!appeal) return res.status(404).json({ message: 'Appeal not found.' });

        res.json(appeal);
    } catch (error) {
        console.error(`[GET APPEAL BY ID ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching the appeal.' });
    }
};

export const updateAppealStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const appeal = await models.Appeal.findByPk(id);

        if (!appeal) return res.status(404).json({ message: 'Appeal not found.' });

        // Validate status
        const validStatuses = ["pending", "reviewed", "denied"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Valid values are: pending, reviewed, denied.' });
        }

        // Update the status
        appeal.status = status;
        await appeal.save();

        res.status(200).json({
            message: 'Appeal status updated successfully.',
            appeal,
        });
    } catch (error) {
        console.error(`[UPDATE APPEAL STATUS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while updating the appeal status.' });
    }
};

export const deleteAppeal = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await models.Appeal.destroy({ where: { id } });

        if (!deleted) return res.status(404).json({ message: 'Appeal not found.' });

        res.status(204).send(); // No content response
    } catch (error) {
        console.error(`[DELETE APPEAL ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while deleting the appeal.' });
    }
};
