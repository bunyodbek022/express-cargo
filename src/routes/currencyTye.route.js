import { Router } from "express";
import { CurrencyType } from "../controller/currencyType.controller.js";
import {createCurrencyTypeSchema, updateCurrencyTypeSchema} from "../validation/currencyType.validation.js"
import { validate } from "../middleware/validate.js";
const router = Router();

router.get("/", CurrencyType.getAll);
router.get("/:id", CurrencyType.getOne);
router.post("/" , validate(createCurrencyTypeSchema), CurrencyType.create);
router.put("/:id", validate(updateCurrencyTypeSchema), CurrencyType.update);
router.delete("/:id", CurrencyType.delete);

export { router as currencyTypeRouter }