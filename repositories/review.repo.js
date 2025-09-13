
import { review } from "../models/review.model.js";

const reviewRepo = {
	verifyReview: async (id) => {
		return await review.update({ isVerify: true }, { where: { id, isVerify: false } });
	},
	createReview: async (values) => {
		return await review.create(values);
	},
	getAllReviews: async () => {
		return await review.findAll();
	},
	getReviewById: async (id) => {
		return await review.findOne({ where: { id } });
	},
	updateReview: async (id, values) => {
		return await review.update(values, { where: { id } });
	},
	deleteReview: async (id) => {
		return await review.destroy({ where: { id } });
	},
};

export default reviewRepo;
