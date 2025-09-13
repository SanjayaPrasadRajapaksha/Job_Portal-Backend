
import express from "express";
const router = express.Router();

import upload from '../config/multer.config.js';
import jobPostController from "../controllers/jobPost.controller.js";


// Job post creation
router.post("/add", upload.single('image'), jobPostController.createJobPost);

// Job application submission (CV upload, send email to company and job seeker)
router.post("/apply", upload.single('cv'), jobPostController.applyForJob);
router.get("/all", jobPostController.getAllJobPosts);
router.get("/all-verify", jobPostController.getAllVerifiedJobPosts);
router.get("/category/:category", jobPostController.getJobPostsByCategory);
router.get("/:id", jobPostController.getJobPostById);
router.put("/update/:id", upload.single('image'), jobPostController.updateJobPost);
router.delete("/delete/:id", jobPostController.deleteJobPost);
router.patch("/verify/:id", jobPostController.verifyJobPost);

export default router;
