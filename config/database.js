import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sgs.sqlite',
    logging: false
});

export default sequelize;
