import express from "express";
import logRouter from "./logRouter.js";
import todoRouter from "./todoRouter.js";

const router = express.Router();

router.use("/logs", logRouter);
router.use("/todos", todoRouter);

export default router;
