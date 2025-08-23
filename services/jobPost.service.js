
	import jobPostRepo from "../repositories/jobPost.repo.js";

const jobPostService = {
		getJobPostsByCategory: async (category) => {
			try {
				const result = await jobPostRepo.getJobPostsByCategory(category);
				return result;
			} catch (error) {
				return { status: false, message: error.message };
			}
		},
	verifyJobPost: async (id) => {
		try {
			return await jobPostRepo.verifyJobPost(id);
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	createJobPost: async (data) => {
		try {
			const result = await jobPostRepo.createJobPost(data);
			return { status: true, message: "Job post added successfully!", result };
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	getAllJobPosts: async () => {
		try {
			const result = await jobPostRepo.getAllJobPosts();
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	getJobPostById: async (id) => {
		try {
			const result = await jobPostRepo.getJobPostById(id);
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	updateJobPost: async (id, data) => {
		try {
			const result = await jobPostRepo.updateJobPost(id, data);
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
	deleteJobPost: async (id) => {
		try {
			const result = await jobPostRepo.deleteJobPost(id);
			return result;
		} catch (error) {
			return { status: false, message: error.message };
		}
	},
};

export default jobPostService;
