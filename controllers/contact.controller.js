import contactService from "../services/contact.service.js";
import { sendResponse, sendError } from "../utils/response.js";

const contactController = {
  contactAdd: async (req, res) => {
    try {
      const { name, email, message, } = req.body;
      const data = { name, email, message };
      const result = await contactService.contactAdd(data);

      if (result.status) {
        return sendResponse(res, 201, true, result.message, result.result);
      } else {
        return sendError(res, 400, result.message);
      }
    } catch (error) {
      console.error(error);
      return sendError(res, 500, "Error occurred while registering contact!", error);
    }
  },

  getAllContact: async (req, res) => {
    try {
      const contact = await contactService.getAllContact();
      if (!contact) return sendError(res, 404, "Contacts not found!");
      return sendResponse(res, 200, true, "Contacts fetched successfully!", contact);
    } catch (error) {
      console.error(error);
      return sendError(res, 500, "Error occurred while fetching contacts!", error);
    }
  },

  deleteContactById: async (req, res) => {
    const id = req.params.id;
    try {
      const isContactDelete = await contactService.deleteContactById(id);
      if (isContactDelete == 1) {
        return sendResponse(res, 200, true, "Contact deleted successfully!");
      } else {
        return sendError(res, 404, "Contact not found!");
      }
    } catch (error) {
      console.error(error);
      return sendError(res, 500, "Error occurred while deleting contact!", error);
    }
  },

  getContactById: async (req, res) => {
    const id = req.params.id;
    try {
      const contact = await contactService.getContactById(id);
      if (!contact) return sendError(res, 404, "Contact not found!");
      return sendResponse(res, 200, true, "Contact fetched successfully!", contact);
    } catch (error) {
      console.error(error);
      return sendError(res, 500, "Error occurred while fetching contact!", error);
    }
  },
};

export default contactController;
