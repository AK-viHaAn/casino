import { Router } from "express";
import { registerController, loginController, refreshController, userDataController } from "./auth.controller";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", userDataController);
router.post("/refresh", refreshController);

export default router;
