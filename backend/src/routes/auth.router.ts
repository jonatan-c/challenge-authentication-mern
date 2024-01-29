import { Router } from "express";
import {
  login,
  profileUser,
  register,
  verifyToken,
} from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.get("/profile", auth, profileUser);

export default router;
