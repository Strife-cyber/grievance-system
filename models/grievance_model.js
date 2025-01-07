import Student from './student_model.js';
import { Model, DataTypes } from "sequelize";

class Grievance extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            student: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Student,
                    key: "id"
                }
            },
            roles: {
                type: DataTypes.JSON,
                allowNull: true
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            priority: {
                type: DataTypes.ENUM("low", "meduim", "high"),
                allowNull: false,
                defaultValue: "low"
            },
            status: {
                type: DataTypes.ENUM("pending", "resolved", "closed"),
                defaultValue: "pending"
            }
        }, { sequelize, modelName: 'grievances' });
    }
}

export default Grievance
