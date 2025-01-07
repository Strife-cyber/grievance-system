import models from '../models/index.js';

export const registerStudent = async (req, res) => {
    const { id, course } = req.body;

    try {
        // Validate the input
        if (!id) return res.status(400).json({ message: 'User ID is required to register a student.' });

        // Ensure the user exists
        const user = await models.User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        // Ensure the student does not already exist
        const existingStudent = await models.Student.findByPk(id);
        if (existingStudent) return res.status(409).json({ message: 'Student already registered.' });

        // Register the student
        const student = await models.Student.create({ id, course });

        res.status(201).json({
            message: 'Student registered successfully.',
            student,
        });
    } catch (error) {
        console.error(`[REGISTER STUDENT ERROR]: ${error.message}`, error);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await models.Student.findAll({
            include: [
                {
                    model: models.User,
                    attributes: ['firstName', 'lastName', 'email'], // Include user details
                },
            ],
        });

        res.json(students);
    } catch (error) {
        console.error(`[GET ALL STUDENTS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching students.' });
    }
};

export const getStudentById = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await models.Student.findByPk(id, {
            include: [
                {
                    model: models.User,
                    attributes: ['firstName', 'lastName', 'email'], // Include user details
                },
                {
                    model: models.Appeal,
                },
                {
                    model: models.Grievance,
                },
            ],
        });

        if (!student) return res.status(404).json({ message: 'Student not found.' });

        res.json(student);
    } catch (error) {
        console.error(`[GET STUDENT BY ID ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching the student.' });
    }
};

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { course } = req.body;

    try {
        const student = await models.Student.findByPk(id);

        if (!student) return res.status(404).json({ message: 'Student not found.' });

        // Update the course if provided
        if (course) student.course = course;

        await student.save();

        res.status(200).json({
            message: 'Student updated successfully.',
            student,
        });
    } catch (error) {
        console.error(`[UPDATE STUDENT ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while updating the student.' });
    }
};

export const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await models.Student.destroy({ where: { id } });

        if (!deleted) return res.status(404).json({ message: 'Student not found.' });

        res.status(204).send(); // No content response
    } catch (error) {
        console.error(`[DELETE STUDENT ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while deleting the student.' });
    }
};

export const getStudentAppeals = async (req, res) => {
    const { id } = req.params;

    try {
        const appeals = await models.Appeal.findAll({
            where: { student: id },
        });

        if (!appeals || appeals.length === 0)
            return res.status(404).json({ message: 'No appeals found for this student.' });

        res.json(appeals);
    } catch (error) {
        console.error(`[GET STUDENT APPEALS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching student appeals.' });
    }
};

export const getStudentGrievances = async (req, res) => {
    const { id } = req.params;

    try {
        const grievances = await models.Grievance.findAll({
            where: { student: id },
        });

        if (!grievances || grievances.length === 0)
            return res.status(404).json({ message: 'No grievances found for this student.' });

        res.json(grievances);
    } catch (error) {
        console.error(`[GET STUDENT GRIEVANCES ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching student grievances.' });
    }
};
