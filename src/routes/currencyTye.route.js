import express from "express";
import { CurrencyType } from "../controller/currencyType.controller.js";
import {createCurrencyTypeSchema, updateCurrencyTypeSchema} from "../validation/currencyType.validation.js"
import { validate } from "../middleware/validate.js";
const app = express();

app.get("/", CurrencyType.getAll);
app.get("/:id", CurrencyType.getOne);
app.post("/" , validate(createCurrencyTypeSchema), CurrencyType.create);
app.put("/:id", validate(updateCurrencyTypeSchema), CurrencyType.update);
app.delete("/:id", CurrencyType.delete);