import sequelize from '../config/database.js';

import User from './user_model.js';
import Staff from './staff_model.js';
import Appeal from './appeal_model.js';
import Student from './student_model.js';
import Response from './response_model.js';
import Grievance from './grievance_model.js';

// Initialize the models
const models = {
    User: User.init(sequelize),
    Staff: Staff.init(sequelize),
    Appeal: Appeal.init(sequelize),
    Student: Student.init(sequelize),
    Response: Response.init(sequelize),
    Grievance: Grievance.init(sequelize)
};

// Defining the associations

models.User.hasMany(models.Staff, { foreignKey: "id" });
models.User.hasMany(models.Student, { foreignKey: "id" });

models.Staff.belongsTo(models.User, { foreignKey: "id" });
models.Staff.hasMany(models.Response, { foreignKey: "staff" });

models.Student.belongsTo(models.User, { foreignKey: "id" });
models.Student.hasMany(models.Appeal, { foreignKey: "student" });
models.Student.hasMany(models.Grievance, { foreignKey: "student" });

models.Appeal.belongsTo(models.Student, { foreignKey: "student" });
models.Appeal.belongsTo(models.Grievance, { foreignKey: "grievance" });

models.Response.belongsTo(models.Staff, { foreignKey: "staff" });
models.Response.belongsTo(models.Grievance, { foreignKey: "grievance" });

models.Grievance.belongsTo(models.Student, { foreignKey: "student" });
models.Grievance.hasMany(models.Appeal, { foreignKey: "grievance" });
models.Grievance.hasMany(models.Response, { foreignKey: "grievance" });

// Set up additional associations if defined in the models
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Sync models with the database
sequelize
    .sync({ alter: false }) // possibly switch to true
    .then(() => console.log('Database && tables created!'))
    .catch((error) => console.error('Database sync failed: ', error));

export { sequelize };
export default models;
