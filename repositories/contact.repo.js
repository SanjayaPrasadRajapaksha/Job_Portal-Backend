import { contact } from "../models/contact.model.js";

const contactRepo = {
    contactAdd: async (values) => {
        try {

            const result = await contact.create({
                name: values.name,
                email: values.email,
                message: values.message,
            }
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    findByEmail: async (email) => {
        try {
            const result = await contact.findOne({
                where: {
                    email: email,
                },

            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    getAllContact: async () => {
        try {
            const result = await contact.findAll({

            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    findById: async (id) => {
        try {
            const result = await contact.findOne({
                where: {
                    id: id,
                },

            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    deleteContactById: async (id) => {
        try {
            const result = await contact.destroy({
                where: {
                    id: id,
                },

            });
            return result;
        } catch (err) {
            throw err;
        }
    }
}


export default contactRepo;