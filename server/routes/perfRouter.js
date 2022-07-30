import express from "express";
import { handleGet, handlePost } from "../controllers/perfController.js";

const router = express.Router();

router.get("/:date", handleGet);
router.post("/", handlePost);

export default router;
