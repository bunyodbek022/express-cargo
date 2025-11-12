import { Router } from "express";
import { Operation } from "../controller/operation.controller.js";
import { createOperationSchema, updateOperationSchema } from "../validation/operation.validation.js";
import { validate } from "../middleware/validate.js";
const router = Router();

router.get("/", Operation.getAll);
router.get("/:id", Operation.getOne);
router.post("/" , validate(createOperationSchema), Operation.create);
router.put("/:id", validate(updateOperationSchema), Operation.update);
router.delete("/:id", Operation.delete);

export {router as operationRouter}