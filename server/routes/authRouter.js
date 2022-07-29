import express from "express";
import {
    handleLogin,
    handleSignup,
    handleLogout,
    handleCheck,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/check", handleCheck);

export default router;
