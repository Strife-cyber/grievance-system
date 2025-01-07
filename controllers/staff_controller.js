import models from '../models/index.js';

export const registerStaff = async (req, res) => {
    const { userId } = req.user;
    const { role, course } = req.body;
    const id  = userId;

    try {
        // Validate the input
        if (!id) return res.status(400).json({ message: 'User ID is required to register a staff member.' });

        // Ensure the user exists
        const user = await models.User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        // Ensure the staff member does not already exist
        const existingStaff = await models.Staff.findByPk(id);
        if (existingStaff) return res.status(409).json({ message: 'Staff member already registered.' });

        // Register the staff member
        const staff = await models.Staff.create({ id, role, course });

        res.status(201).json({
            message: 'Staff member registered successfully.',
            staff,
        });
    } catch (error) {
        console.error(`[REGISTER STAFF ERROR]: ${error.message}`, error);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
};

export const getAllStaff = async (req, res) => {
    try {
        const staffMembers = await models.Staff.findAll({
            include: [
                {
                    model: models.User,
                    attributes: ['firstName', 'lastName', 'email'], // Include user details
                },
            ],
        });

        res.json(staffMembers);
    } catch (error) {
        console.error(`[GET ALL STAFF ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching staff members.' });
    }
};

export const getStaffById = async (req, res) => {
    const { userId } = req.user;
    const id = userId;

    try {
        const staff = await models.Staff.findByPk(id, {
            include: [
                {
                    model: models.User,
                    attributes: ['firstName', 'lastName', 'email'], // Include user details
                },
                {
                    model: models.Response,
                },
            ],
        });

        if (!staff) return res.status(404).json({ message: 'Staff member not found.' });

        res.json(staff);
    } catch (error) {
        console.error(`[GET STAFF BY ID ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching the staff member.' });
    }
};

export const updateStaff = async (req, res) => {
    const { userId } = req.user;
    const id = userId;
    const { role, course } = req.body;

    try {
        const staff = await models.Staff.findByPk(id);

        if (!staff) return res.status(404).json({ message: 'Staff member not found.' });

        // Update fields if provided
        if (role) staff.role = role;
        if (course) staff.course = course;

        await staff.save();

        res.status(200).json({
            message: 'Staff member updated successfully.',
            staff,
        });
    } catch (error) {
        console.error(`[UPDATE STAFF ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while updating the staff member.' });
    }
};

export const deleteStaff = async (req, res) => {
    const { userId } = req.user;
    const id = userId;

    try {
        const deleted = await models.Staff.destroy({ where: { id } });

        if (!deleted) return res.status(404).json({ message: 'Staff member not found.' });

        res.status(204).send(); // No content response
    } catch (error) {
        console.error(`[DELETE STAFF ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while deleting the staff member.' });
    }
};

export const getStaffResponses = async (req, res) => {
    const { userId } = req.user;
    const id = userId;

    try {
        const responses = await models.Response.findAll({
            where: { staffId: id },
        });

        if (!responses || responses.length === 0)
            return res.status(404).json({ message: 'No responses found for this staff member.' });

        res.json(responses);
    } catch (error) {
        console.error(`[GET STAFF RESPONSES ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching staff responses.' });
    }
};
