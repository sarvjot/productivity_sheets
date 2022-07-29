import express from "express";
import logRouter from "./logRouter.js";
import todoRouter from "./todoRouter.js";
import authRouter from "./authRouter.js";
import perfRouter from "./perfRouter.js";

const router = express.Router();

router.use("/logs", logRouter);
router.use("/todos", todoRouter);
router.use("/auth", authRouter);
router.use("/perf", perfRouter);

export default router;
