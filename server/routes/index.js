import express from "express";
import authRouter from "./authRouter.js";
import todoRouter from "./todoRouter.js";
import logRouter from "./logRouter.js";
import perfRouter from "./perfRouter.js";

import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/todos", requireAuth, todoRouter);
router.use("/logs", requireAuth, logRouter);
router.use("/perf", requireAuth, perfRouter);

export default router;
