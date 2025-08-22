

import { deleteImage, uploadImage } from "../services/cloudinary.service.js";
import jobPostService from "../services/jobPost.service.js";
import { sendError, sendResponse } from "../utils/response.js";

const jobPostController = {
	createJobPost: async (req, res) => {
		try {
			let data = req.body;
			// If selectedDistricts is sent as a string (from form-data), parse it
			if (typeof data.selectedDistricts === 'string') {
				try { data.selectedDistricts = JSON.parse(data.selectedDistricts); } catch {}
			}
			// Handle image upload
			if (req.file) {
				// Convert buffer to base64 data URI
				const mimeType = req.file.mimetype;
				const base64String = req.file.buffer.toString('base64');
				const dataUri = `data:${mimeType};base64,${base64String}`;
				// Upload image to Cloudinary
				const uploadResult = await uploadImage(dataUri, 'jobposts');
				if (uploadResult?.secure_url) {
					data.image = uploadResult.secure_url;
					data.imagePublicId = uploadResult.public_id;
				} else {
					return sendError(res, 500, 'Image upload failed', uploadResult?.error?.message || 'Cloudinary error');
				}
			}
			const result = await jobPostService.createJobPost(data);
			if (result.status) {
				return sendResponse(res, 201, true, result.message, result.result);
			} else {
				return sendError(res, 400, result.message);
			}
		} catch (error) {
			console.error('Error in createJobPost:', error);
			return sendError(res, 500, "Error occurred while adding job post!", error?.message || error);
		}
	},
	getAllJobPosts: async (req, res) => {
		try {
			const jobPosts = await jobPostService.getAllJobPosts();
			return sendResponse(res, 200, true, "Job posts fetched successfully!", jobPosts);
		} catch (error) {
			return sendError(res, 500, "Error occurred while fetching job posts!", error);
		}
	},
	getJobPostById: async (req, res) => {
		try {
			const id = req.params.id;
			const jobPost = await jobPostService.getJobPostById(id);
			if (!jobPost) return sendError(res, 404, "Job post not found!");
			return sendResponse(res, 200, true, "Job post fetched successfully!", jobPost);
		} catch (error) {
			return sendError(res, 500, "Error occurred while fetching job post!", error);
		}
	},
	updateJobPost: async (req, res) => {
		try {
			const id = req.params.id;
			let data = req.body;
			// If selectedDistricts is sent as a string (from form-data), parse it
			if (typeof data.selectedDistricts === 'string') {
				try { data.selectedDistricts = JSON.parse(data.selectedDistricts); } catch {}
			}
			// Handle image upload
			if (req.file) {
				// Get old job post to delete old image from Cloudinary
				const oldJob = await jobPostService.getJobPostById(id);
				if (oldJob?.imagePublicId) {
					await deleteImage(oldJob.imagePublicId);
				}
				// Convert buffer to base64 data URI
				const mimeType = req.file.mimetype;
				const base64String = req.file.buffer.toString('base64');
				const dataUri = `data:${mimeType};base64,${base64String}`;
				// Upload image to Cloudinary
				const uploadResult = await uploadImage(dataUri, 'jobposts');
				if (uploadResult?.secure_url) {
					data.image = uploadResult.secure_url;
					data.imagePublicId = uploadResult.public_id;
				} else {
					return sendError(res, 500, 'Image upload failed', uploadResult?.error?.message || 'Cloudinary error');
				}
			}
			const result = await jobPostService.updateJobPost(id, data);
			if (result[0] === 1) {
				return sendResponse(res, 200, true, "Job post updated successfully!");
			} else {
				return sendError(res, 404, "Job post not found or no changes made!");
			}
		} catch (error) {
			return sendError(res, 500, "Error occurred while updating job post!", error);
		}
	},
	deleteJobPost: async (req, res) => {
		try {
			const id = req.params.id;
			// Get job post to delete image from Cloudinary
			const job = await jobPostService.getJobPostById(id);
					if (job?.imagePublicId) {
						await deleteImage(job.imagePublicId);
					}
			const result = await jobPostService.deleteJobPost(id);
			if (result === 1) {
				return sendResponse(res, 200, true, "Job post deleted successfully!");
			} else {
				return sendError(res, 404, "Job post not found!");
			}
		} catch (error) {
			return sendError(res, 500, "Error occurred while deleting job post!", error);
		}
	},
};

export default jobPostController;
