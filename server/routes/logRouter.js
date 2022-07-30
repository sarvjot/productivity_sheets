import express from "express";
import { handleGet, handlePost, handleDelete } from "../controllers/logController.js";

const router = express.Router();

router.get("/:date", handleGet);
router.post("/", handlePost);
router.delete("/:id", handleDelete);

export default router;
