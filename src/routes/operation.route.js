import express from "express";
import { Operation } from "../controller/operation.controller.js";
import { createOperationSchema, updateOperationSchema } from "../validation/operation.validation.js";
import { validate } from "../middleware/validate.js";
const app = express();

app.get("/", Operation.getAll);
app.get("/:id", Operation.getOne);
app.post("/" , validate(createOperationSchema), Operation.create);
app.put("/:id", validate(updateOperationSchema), Operation.update);
app.delete("/:id", Operation.delete);