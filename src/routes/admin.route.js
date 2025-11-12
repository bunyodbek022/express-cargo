import { Router } from "express";
import { createAdminSchema, updateAdminSchema } from "../validation/admin.validation.js";
import { Admin } from "../controller/admin.controller.js";
import { validate } from "../middleware/validate.js";
const router = Router();

router.get("/", Admin.getAll);
router.get("/:id", Admin.getOne);
router.post("/" , validate(createAdminSchema), Admin.create);
router.put("/:id", validate(updateAdminSchema), Admin.update);
router.delete("/:id", Admin.delete);

export { router as adminRouter };