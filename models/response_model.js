import Staff from './staff_model.js';
import Grievance from './grievance_model.js';
import { Model, DataTypes } from "sequelize";

class Response extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            grievanceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Grievance,
                    key: "id"
                }
            },
            staffId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Staff,
                    key: "id"
                }
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            timestamp: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            }
        }, { sequelize, modelName: 'responses' });
    }
}

export default Response;
