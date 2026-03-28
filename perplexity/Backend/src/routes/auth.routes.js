import { Router } from "express";
import { register,verifyEmail,login,getMe } from "../controllers/auth.controller.js";
import { registerValidator,loginValidator } from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";
const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, register);
/** * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body { email, password }
 */
authRouter.post("/login", loginValidator, login);


/** * @route GET /api/auth/verify-email?token=...
 * @desc Verify user's email address
 * @access Public
 * @query { token }
 */ 
authRouter.get("/get-me", authUser, getMe);
authRouter.get("/verify-email", verifyEmail);
export default authRouter;