
import reviewRepo from "../repositories/review.repo.js";

const reviewService = {
	verifyReview: async (id) => {
		try {
			return await reviewRepo.verifyReview(id);
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	createReview: async (data) => {
		try {
			const result = await reviewRepo.createReview(data);
			return { status: true, message: "Review added successfully!", result };
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	getAllReviews: async () => {
		try {
			const result = await reviewRepo.getAllReviews();
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	getReviewById: async (id) => {
		try {
			const result = await reviewRepo.getReviewById(id);
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	updateReview: async (id, data) => {
		try {
			const result = await reviewRepo.updateReview(id, data);
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	deleteReview: async (id) => {
		try {
			const result = await reviewRepo.deleteReview(id);
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
};

export default reviewService;
