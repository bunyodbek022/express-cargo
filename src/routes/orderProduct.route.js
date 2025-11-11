import express from "express";
import { OrderProduct } from "../controller/orderProducts.controller.js";
import { createOrderProductSchema, updateOrderProductSchema } from "../validation/orderProduct.validation.js";
import { validate } from "../middleware/validate.js";
const app = express();

app.get("/", OrderProduct.getAll);
app.get("/:id", OrderProduct.getOne);
app.post("/" , validate(createOrderProductSchema), OrderProduct.create);
app.put("/:id", validate(updateOrderProductSchema), OrderProduct.update);
app.delete("/:id", OrderProduct.delete);