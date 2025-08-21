import sequelize from "../config/db.config.js";
import { DataTypes } from "sequelize";

export const contact = sequelize.define(
    "contact",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Invalid email format",
                }
            },
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "contact",
    }
);