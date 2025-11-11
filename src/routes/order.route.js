import express from "express";
import { Order } from "../controller/order.controller.js";
import { createOrderSchema, updateOrderSchema } from "../validation/order.validation.js";
import { validate } from "../middleware/validate.js";
const app = express();

app.get("/", Order.getAll);
app.get("/:id", Order.getOne);
app.post("/" , validate(createOrderSchema), Order.create);
app.put("/:id", validate(updateOrderSchema), Order.update);
app.delete("/:id", Order.delete);