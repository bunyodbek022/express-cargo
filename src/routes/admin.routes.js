import express from "express";
import { createAdminSchema, updateAdminSchema } from "../validation/admin.validation.js";
import { Admin } from "../controller/admin.controller.js";
import { validate } from "../middleware/validate.js";
const app = express();

app.get("/", Admin.getAll);
app.get("/:id", Admin.getOne);
app.post("/" , validate(createAdminSchema), Admin.create);
app.put("/:id", validate(updateAdminSchema), Admin.update);
app.delete("/:id", Admin.delete);