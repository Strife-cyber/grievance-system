import User from './user_model.js';
import { Model, DataTypes } from "sequelize";

class Student extends Model {
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
            course: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, { sequelize, modelName: 'students' })
    }
}

export default Student;
