import User from './user_model.js';
import { Model, DataTypes } from "sequelize";

class Staff extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: false,
                references: {
                    model: User,
                    key: "id"
                }
            },
            role: {
                type: DataTypes.STRING,
                allowNull: true
            },
            course: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, { sequelize, modelName: 'staffs' })
    }
}

export default Staff;
