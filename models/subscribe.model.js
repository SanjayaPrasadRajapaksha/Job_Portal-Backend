import sequelize from "../config/db.config.js";
import { DataTypes } from "sequelize";

export const Subscribe = sequelize.define(
    "subscribe",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
    },
    {
        tableName: "subscribe",
    }
);