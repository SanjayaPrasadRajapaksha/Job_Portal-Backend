import contactRepo from "../repositories/contact.repo.js";
import sendEmail from "../config/sendContactEmail.js";

const contactService = {
    contactAdd: async (values) => {
        try {
            const contact = await contactRepo.contactAdd(values);

            // Try sending email, but don't block success if it fails
            try {
                await sendEmail(values.email, values.message, values.name);
            } catch (emailError) {
                console.error("Email send failed:", emailError.message);
                // Optional: you can log this or notify admin
            }

            return {
                status: true,
                message: 'Contact us Added successfully!',
                result: contact
            };

        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    getAllContact: async () => {
        try {
            const allContact = await contactRepo.getAllContact();
            return allContact;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    getContactById: async (id) => {
        try {
            const contact = await contactRepo.findById(id);
            return contact;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    deleteContactById: async (id) => {
        try {
            const deleteContact = await contactRepo.deleteContactById(id);
            return deleteContact;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },
}


export default contactService;