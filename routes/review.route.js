
import express from "express";
import reviewController from "../controllers/review.controller.js";
const router = express.Router();


router.post("/add", reviewController.createReview);
router.get("/all", reviewController.getAllReviews);
router.get("/verified", reviewController.getVerifiedReviews);
router.get("/:id", reviewController.getReviewById);
router.put("/update/:id", reviewController.updateReview);
router.delete("/delete/:id", reviewController.deleteReview);
router.patch("/verify/:id", reviewController.verifyReview);

export default router;
