import { Router } from "express";
import { OrderProduct } from "../controller/orderProducts.controller.js";
import { createOrderProductSchema, updateOrderProductSchema } from "../validation/orderProduct.validation.js";
import { validate } from "../middleware/validate.js";
const router = Router();

router.get("/", OrderProduct.getAll);
router.get("/:id", OrderProduct.getOne);
router.post("/" , validate(createOrderProductSchema), OrderProduct.create);
router.put("/:id", validate(updateOrderProductSchema), OrderProduct.update);
router.delete("/:id", OrderProduct.delete);

export {router as orderProductRouter}