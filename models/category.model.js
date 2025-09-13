
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

export const category = sequelize.define(
	"category",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		tableName: "category",
	}
);
