
import sendSubscribeEmail from "../config/sendSubscribeEmail.js";
import {
    createSubscribe,
    deleteSubscribe,
    getAllSubscribes,
    getSubscribeByEmail,
    getSubscribeById,
    updateSubscribe,
} from "../repositories/subscribe.repo.js";

export const addSubscribe = async (email) => {
    // Check if email already exists
    const existing = await getSubscribeByEmail(email);
    if (existing) {
        return { status: false, message: "Email is already subscribed." };
    }
    const result = await createSubscribe(email);
    await sendSubscribeEmail(email);
    return { status: true, result };
};
export const fetchAllSubscribes = async () => getAllSubscribes();
export const fetchSubscribeById = async (id) => getSubscribeById(id);
export const editSubscribe = async (id, email) => updateSubscribe(id, email);
export const removeSubscribe = async (id) => deleteSubscribe(id);
