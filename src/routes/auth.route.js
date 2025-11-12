import { Router } from "express";
import { AUTH } from "../controller/auth.controller.js";
import { createClientSchema, updateClientSchema , loginClientScheme} from "../validation/client.validation.js";
import { validate } from "../middleware/validate.js";
import { authGuard } from "../middleware/authGuard.js";
const router = Router();

router.get("/profile", authGuard, AUTH.profile);
router.post("/verify", authGuard, AUTH.verifyUser);
router.post("/logout", authGuard, AUTH.logout);
router.post("/register", validate(createClientSchema), AUTH.register);
router.post("/login", validate(loginClientScheme), AUTH.login)
router.post("/updateAccess", authGuard, validate(updateClientSchema), AUTH.updateAccess);
router.delete("/", authGuard, AUTH.deleteUser);

export { router as authRouter }