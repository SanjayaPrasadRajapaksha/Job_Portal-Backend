
import express from "express";
const router = express.Router();

import upload from '../config/multer.config.js';
import jobPostController from "../controllers/jobPost.controller.js";


router.post("/add", upload.single('image'), jobPostController.createJobPost);
router.get("/all", jobPostController.getAllJobPosts);
router.get("/category/:category", jobPostController.getJobPostsByCategory);
router.get("/:id", jobPostController.getJobPostById);
router.put("/update/:id", upload.single('image'), jobPostController.updateJobPost);
router.delete("/delete/:id", jobPostController.deleteJobPost);
router.patch("/verify/:id", jobPostController.verifyJobPost);

export default router;
