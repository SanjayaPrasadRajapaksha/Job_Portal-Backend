

import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

export const jobPost = sequelize.define(
	"jobPost",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		   image: {
			   type: DataTypes.STRING,
			   allowNull: true,
		   },
		   imagePublicId: {
			   type: DataTypes.STRING,
			   allowNull: true,
		   },
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		categoryOther: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		area: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		selectedDistricts: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		areaOther: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		workType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		workTypeOther: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		company: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		website: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		applicationMethod: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		applicationMethodOther: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		openingDay: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		closingDay: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		isVerify: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		tableName: "jobPost",
	}
);
