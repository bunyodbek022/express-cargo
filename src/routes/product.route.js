import { Router } from "express";
import { Product } from "../controller/product.controller.js";
import { createProductSchema, updateProductSchema } from "../validation/product.validation.js";
import { validate } from "../middleware/validate.js";
const router = Router();

router.get("/", Product.getAll);
router.get("/:id", Product.getOne);
router.post("/" , validate(createProductSchema), Product.create);
router.put("/:id", validate(updateProductSchema), Product.update);
router.delete("/:id", Product.delete);

export { router as productRouter }