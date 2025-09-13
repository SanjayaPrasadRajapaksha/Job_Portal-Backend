
import reviewService from "../services/review.service.js";
import { sendError, sendResponse } from "../utils/response.js";

const reviewController = {
	getVerifiedReviews: async (req, res) => {
		try {
			const reviews = await reviewService.getAllReviews();
			const verified = Array.isArray(reviews) ? reviews.filter(r => r.isVerify === true) : [];
			return sendResponse(res, 200, true, "Verified reviews fetched successfully!", verified);
		} catch (error) {
			return sendError(res, 500, "Error occurred while fetching verified reviews!", error);
		}
	},
	verifyReview: async (req, res) => {
		try {
			const id = req.params.id;
			const result = await reviewService.verifyReview(id);
			if (result[0] === 1) {
				return sendResponse(res, 200, true, "Review verified successfully!");
			} else {
				return sendError(res, 404, "Review not found or already verified!");
			}
		} catch (error) {
			return sendError(res, 500, "Error occurred while verifying review!", error);
		}
	},
	createReview: async (req, res) => {
		try {
			const data = req.body;
			const result = await reviewService.createReview(data);
			if (result.status) {
				return sendResponse(res, 201, true, result.message, result.result);
			} else {
				return sendError(res, 400, result.message);
			}
		} catch (error) {
			return sendError(res, 500, "Error occurred while adding review!", error);
		}
	},
	getAllReviews: async (req, res) => {
		try {
			const reviews = await reviewService.getAllReviews();
			return sendResponse(res, 200, true, "Reviews fetched successfully!", reviews);
		} catch (error) {
			return sendError(res, 500, "Error occurred while fetching reviews!", error);
		}
	},
	getReviewById: async (req, res) => {
		try {
			const id = req.params.id;
			const review = await reviewService.getReviewById(id);
			if (!review) return sendError(res, 404, "Review not found!");
			return sendResponse(res, 200, true, "Review fetched successfully!", review);
		} catch (error) {
			return sendError(res, 500, "Error occurred while fetching review!", error);
		}
	},
	updateReview: async (req, res) => {
		try {
			const id = req.params.id;
			const data = req.body;
			const result = await reviewService.updateReview(id, data);
			if (result[0] === 1) {
				return sendResponse(res, 200, true, "Review updated successfully!");
			} else {
				return sendError(res, 404, "Review not found or no changes made!");
			}
		} catch (error) {
			return sendError(res, 500, "Error occurred while updating review!", error);
		}
	},
	deleteReview: async (req, res) => {
		try {
			const id = req.params.id;
			const result = await reviewService.deleteReview(id);
			if (result === 1) {
				return sendResponse(res, 200, true, "Review deleted successfully!");
			} else {
				return sendError(res, 404, "Review not found!");
			}
		} catch (error) {
			return sendError(res, 500, "Error occurred while deleting review!", error);
		}
	},
};

export default reviewController;
