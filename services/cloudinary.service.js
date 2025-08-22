

import cloudinary from '../config/cloudinary.config.js';



export const uploadImage = async (filePath, folder = 'jobposts') => {
	return cloudinary.uploader.upload(filePath, {
		 folder,
		 resource_type: 'image',
	});
};

export const deleteImage = async (publicId) => {
	return cloudinary.uploader.destroy(publicId);
};
