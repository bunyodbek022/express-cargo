import express from "express";
import { Product } from "../controller/product.controller.js";
import { createProductSchema, updateProductSchema } from "../validation/product.validation.js";
import { validate } from "../middleware/validate.js";
const app = express();

app.get("/", Product.getAll);
app.get("/:id", Product.getOne);
app.post("/" , validate(createProductSchema), Product.create);
app.put("/:id", validate(updateProductSchema), Product.update);
app.delete("/:id", Product.delete);