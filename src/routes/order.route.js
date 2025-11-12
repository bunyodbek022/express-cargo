import { Router } from "express";
import { Order } from "../controller/order.controller.js";
import { createOrderSchema, updateOrderSchema } from "../validation/order.validation.js";
import { validate } from "../middleware/validate.js";
const router = Router();

router.get("/", Order.getAll);
router.get("/:id", Order.getOne);
router.post("/" , validate(createOrderSchema), Order.create);
router.put("/:id", validate(updateOrderSchema), Order.update);
router.delete("/:id", Order.delete);

export {router as orderRouter}