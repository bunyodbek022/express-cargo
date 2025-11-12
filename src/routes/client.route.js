import { Router } from "express";
import { Client } from "../controller/client.controller.js";
import { createClientSchema, updateClientSchema } from "../validation/client.validation.js";
import { validate } from "../middleware/validate.js";
const router = Router();

router.get("/", Client.getAll);
router.get("/:id", Client.getOne);
router.post("/" , validate(createClientSchema), Client.create);
router.put("/:id", validate(updateClientSchema), Client.update);
router.delete("/:id", Client.delete);

export { router as clientRouter }