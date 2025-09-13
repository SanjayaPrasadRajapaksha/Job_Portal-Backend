export const getSubscribeByEmail = async (email) => {
	return await Subscribe.findOne({ where: { email } });
};
import { Subscribe } from "../models/subscribe.model.js";

export const createSubscribe = async (email) => {
	return await Subscribe.create({ email });
};

export const getAllSubscribes = async () => {
	return await Subscribe.findAll();
};

export const getSubscribeById = async (id) => {
	return await Subscribe.findByPk(id);
};

export const updateSubscribe = async (id, email) => {
	const subscribe = await Subscribe.findByPk(id);
	if (!subscribe) return null;
	subscribe.email = email;
	await subscribe.save();
	return subscribe;
};

export const deleteSubscribe = async (id) => {
	const subscribe = await Subscribe.findByPk(id);
	if (!subscribe) return null;
	await subscribe.destroy();
	return true;
};
