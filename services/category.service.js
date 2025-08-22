
import categoryRepo from "../repositories/category.repo.js";

const categoryService = {
	createCategory: async (data) => {
		try {
			const result = await categoryRepo.createCategory(data);
			return { status: true, message: "Category added successfully!", result };
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	getAllCategories: async () => {
		try {
			const result = await categoryRepo.getAllCategories();
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	getCategoryById: async (id) => {
		try {
			const result = await categoryRepo.getCategoryById(id);
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	updateCategory: async (id, data) => {
		try {
			const result = await categoryRepo.updateCategory(id, data);
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	deleteCategory: async (id) => {
		try {
			const result = await categoryRepo.deleteCategory(id);
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
};

export default categoryService;
