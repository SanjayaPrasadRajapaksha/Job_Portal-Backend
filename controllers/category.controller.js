
import categoryService from "../services/category.service.js";
import { sendError, sendResponse } from "../utils/response.js";

const categoryController = {
	createCategory: async (req, res) => {
		try {
			const data = req.body;
			const result = await categoryService.createCategory(data);
			if (result.status) {
				return sendResponse(res, 201, true, result.message, result.result);
			} else {
				return sendError(res, 400, result.message);
			}
		} catch (error) {
			return sendError(res, 500, "Error occurred while adding category!", error);
		}
	},
	getAllCategories: async (req, res) => {
		try {
			const categories = await categoryService.getAllCategories();
			return sendResponse(res, 200, true, "Categories fetched successfully!", categories);
		} catch (error) {
			return sendError(res, 500, "Error occurred while fetching categories!", error);
		}
	},
	getCategoryById: async (req, res) => {
		try {
			const id = req.params.id;
			const category = await categoryService.getCategoryById(id);
			if (!category) return sendError(res, 404, "Category not found!");
			return sendResponse(res, 200, true, "Category fetched successfully!", category);
		} catch (error) {
			return sendError(res, 500, "Error occurred while fetching category!", error);
		}
	},
	updateCategory: async (req, res) => {
		try {
			const id = req.params.id;
			const data = req.body;
			const result = await categoryService.updateCategory(id, data);
			if (result[0] === 1) {
				return sendResponse(res, 200, true, "Category updated successfully!");
			} else {
				return sendError(res, 404, "Category not found or no changes made!");
			}
		} catch (error) {
			return sendError(res, 500, "Error occurred while updating category!", error);
		}
	},
	deleteCategory: async (req, res) => {
		try {
			const id = req.params.id;
			const result = await categoryService.deleteCategory(id);
			if (result === 1) {
				return sendResponse(res, 200, true, "Category deleted successfully!");
			} else {
				return sendError(res, 404, "Category not found!");
			}
		} catch (error) {
			return sendError(res, 500, "Error occurred while deleting category!", error);
		}
	},
};

export default categoryController;
