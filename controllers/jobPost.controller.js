import { deleteImage, uploadImage } from "../services/cloudinary.service.js";
import jobPostService from "../services/jobPost.service.js";
import { sendError, sendResponse } from "../utils/response.js";

import { sendJobApplicationMail } from "../services/jobApplicationMail.service.js";

const jobPostController = {
	// Handle job application submission: receive form fields and CV, send emails
	applyForJob: async (req, res) => {
		try {
			const { applicantName, applicantEmail, message, jobTitle, companyEmail, companyName } = req.body;
			// Validate required fields
			if (!applicantName || !applicantEmail || !jobTitle || !companyEmail || !companyName) {
				return sendError(res, 400, "Missing required fields");
			}
			// Prepare CV attachment if file is present
			let cvAttachment = null;
			if (req.file) {
				cvAttachment = {
					filename: req.file.originalname,
					content: req.file.buffer,
					contentType: req.file.mimetype
				};
			}
			// Send emails to company and job seeker
			await sendJobApplicationMail({
				applicantName,
				applicantEmail,
				message,
				jobTitle,
				companyEmail,
				companyName,
				cvAttachment
			});
			return sendResponse(res, 200, true, "Application submitted and emails sent successfully");
		} catch (error) {
			console.error('Error in applyForJob:', error);
			return sendError(res, 500, "Error occurred while submitting application!", error?.message || error);
		}
	},
	getJobPostsByCategory: async (req, res) => {
		try {
			const category = req.params.category;
			const jobPosts = await jobPostService.getJobPostsByCategory(category);
			// Only return verified jobs
			const verifiedJobs = Array.isArray(jobPosts)
				? jobPosts.filter(job => job.isVerify === true)
				: [];
			return sendResponse(res, 200, true, "Job posts fetched successfully!", verifiedJobs);
		} catch (error) {
			return sendError(res, 500, "Error occurred while fetching job posts by category!", error);
		}
	},

	verifyJobPost: async (req, res) => {
		try {
			const id = req.params.id;
			const result = await jobPostService.verifyJobPost(id);
			if (result[0] === 1) {
				return sendResponse(res, 200, true, "Job post verified successfully!");
			} else {
				return sendError(res, 404, "Job post not found or already verified!");
			}
		} catch (error) {
			return sendError(res, 500, "Error occurred while verifying job post!", error);
		}
	},
	createJobPost: async (req, res) => {
		try {
			let data = req.body;
			// If selectedDistricts is sent as a string (from form-data), parse it
			if (typeof data.selectedDistricts === 'string') {
				try { data.selectedDistricts = JSON.parse(data.selectedDistricts); } catch { }
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
	getAllVerifiedJobPosts: async (req, res) => {
		try {
			const jobPosts = await jobPostService.getAllJobPosts();
			// Only return verified jobs
			const verifiedJobs = Array.isArray(jobPosts)
				? jobPosts.filter(job => job.isVerify === true)
				: [];
			return sendResponse(res, 200, true, "Job posts fetched successfully!", verifiedJobs);
		} catch (error) {
			return sendError(res, 500, "Error occurred while fetching job posts!", error);
		}
	},
	getAllJobPosts: async (req, res) => {
		try {
			const jobPosts = await jobPostService.getAllJobPosts();
			// Only return verified jobs
			
			return sendResponse(res, 200, true, "Job posts fetched successfully!", jobPosts);
		} catch (error) {
			return sendError(res, 500, "Error occurred while fetching verified job posts!", error);
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
				try { data.selectedDistricts = JSON.parse(data.selectedDistricts); } catch { }
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
