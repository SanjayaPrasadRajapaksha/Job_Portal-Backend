import express from "express";
import subscribeController from "../controllers/subscribe.controller.js";

const router = express.Router();

router.post("/add", subscribeController.create);
router.get("/all", subscribeController.getAll);
router.get("/:id", subscribeController.getById);
router.put("/update/:id", subscribeController.update);
router.delete("/delete/:id", subscribeController.delete);

export default router;
