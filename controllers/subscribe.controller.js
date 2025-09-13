import {
    addSubscribe,
    editSubscribe,
    fetchAllSubscribes,
    fetchSubscribeById,
    removeSubscribe,
} from "../services/subscribe.service.js";
import { sendError, sendResponse } from "../utils/response.js";

const subscribeController = {
	create: async (req, res) => {
		try {
			const { email } = req.body;
			if (!email) return sendError(res, 400, "Email is required");
			const response = await addSubscribe(email);
			if (!response.status) {
				return sendError(res, 409, response.message);
			}
			return sendResponse(res, 201, true, "Subscribed successfully", response.result);
		} catch (err) {
			return sendError(res, 500, "Failed to subscribe", err.message);
		}
	},
	getAll: async (req, res) => {
		try {
			const result = await fetchAllSubscribes();
			return sendResponse(res, 200, true, "Fetched all subscribes", result);
		} catch (err) {
			return sendError(res, 500, "Failed to fetch subscribes", err.message);
		}
	},
	getById: async (req, res) => {
		try {
			const { id } = req.params;
			const result = await fetchSubscribeById(id);
			if (!result) return sendError(res, 404, "Subscribe not found");
			return sendResponse(res, 200, true, "Fetched subscribe", result);
		} catch (err) {
			return sendError(res, 500, "Failed to fetch subscribe", err.message);
		}
	},
	update: async (req, res) => {
		try {
			const { id } = req.params;
			const { email } = req.body;
			const result = await editSubscribe(id, email);
			if (!result) return sendError(res, 404, "Subscribe not found");
			return sendResponse(res, 200, true, "Updated subscribe", result);
		} catch (err) {
			return sendError(res, 500, "Failed to update subscribe", err.message);
		}
	},
	delete: async (req, res) => {
		try {
			const { id } = req.params;
			const result = await removeSubscribe(id);
			if (!result) return sendError(res, 404, "Subscribe not found");
			return sendResponse(res, 200, true, "Deleted subscribe");
		} catch (err) {
			return sendError(res, 500, "Failed to delete subscribe", err.message);
		}
	},
};

export default subscribeController;
