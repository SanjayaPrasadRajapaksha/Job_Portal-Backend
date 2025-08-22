
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

export const review = sequelize.define(
	"review",
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
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		company: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		position: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		review: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		date: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "review",
	}
);
