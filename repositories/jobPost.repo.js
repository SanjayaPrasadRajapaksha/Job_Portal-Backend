
import { jobPost } from "../models/jobPost.model.js";

const jobPostRepo = {
	createJobPost: async (values) => {
		return await jobPost.create(values);
	},
	getAllJobPosts: async () => {
		return await jobPost.findAll();
	},
	getJobPostById: async (id) => {
		return await jobPost.findOne({ where: { id } });
	},
	updateJobPost: async (id, values) => {
		return await jobPost.update(values, { where: { id } });
	},
	deleteJobPost: async (id) => {
		return await jobPost.destroy({ where: { id } });
	},
};

export default jobPostRepo;
