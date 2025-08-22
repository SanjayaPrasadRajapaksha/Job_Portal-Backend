
import express from "express";
import reviewController from "../controllers/review.controller.js";
const router = express.Router();

router.post("/add", reviewController.createReview);
router.get("/all", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);
router.put("/update/:id", reviewController.updateReview);
router.delete("/delete/:id", reviewController.deleteReview);

export default router;
