
import { category } from "../models/category.model.js";

const categoryRepo = {
	createCategory: async (values) => {
		return await category.create(values);
	},
	getAllCategories: async () => {
		return await category.findAll();
	},
	getCategoryById: async (id) => {
		return await category.findOne({ where: { id } });
	},
	updateCategory: async (id, values) => {
		return await category.update(values, { where: { id } });
	},
	deleteCategory: async (id) => {
		return await category.destroy({ where: { id } });
	},
};

export default categoryRepo;
