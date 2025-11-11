import Joi from "joi";

export const createOperationSchema = Joi.object({
  orderId: Joi.string().uuid().required(),
  adminId: Joi.string().uuid().optional(),
  status: Joi.string()
    .valid("ongoing", "in_procces", "delivered", "rejected")
    .default("ongoing"),
  operation_date: Joi.date().optional(),
  description: Joi.string().allow(null, "").optional()
});

export const updateOperationSchema = Joi.object({
  orderId: Joi.string().uuid().optional(),
  adminId: Joi.string().uuid().optional(),
  status: Joi.string()
    .valid("ongoing", "in_procces", "delivered", "rejected")
    .optional(),
  operation_date: Joi.date().optional(),
  description: Joi.string().allow(null, "").optional()
});