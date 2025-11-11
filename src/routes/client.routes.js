import express from "express";
import { Client } from "../controller/client.controller.js";
import { createClientSchema, updateClientSchema } from "../validation/client.validation.js";
import { validate } from "../middleware/validate.js";
const app = express();

app.get("/", Client.getAll);
app.get("/:id", Client.getOne);
app.post("/" , validate(createClientSchema), Client.create);
app.put("/:id", validate(updateClientSchema), Client.update);
app.delete("/:id", Client.delete);