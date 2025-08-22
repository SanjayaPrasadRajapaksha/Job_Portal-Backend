
import express from "express";
import categoryController from "../controllers/category.controller.js";
const router = express.Router();

router.post("/add", categoryController.createCategory);
router.get("/all", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

export default router;
