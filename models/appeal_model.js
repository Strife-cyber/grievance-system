import Student from './student_model.js';
import Grievance from './grievance_model.js';
import { Model, DataTypes } from "sequelize";

class Appeal extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            studentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Student,
                    key: "id"
                }
            },
            grievanceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Grievance,
                    key: "id"
                }
            },
            reason: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM("pending", "reviewed", "denied"),
                defaultValue: "pending"
            }
        }, { sequelize, modelName: 'appeals' });
    }
}

export default Appeal;
