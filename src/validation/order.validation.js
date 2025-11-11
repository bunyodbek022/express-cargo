import Joi from "joi";

export const createOrderSchema = Joi.object({
  clientId: Joi.string().uuid().required(),
  order_unique_id: Joi.string().uuid().optional(),
  created_at: Joi.date().optional()
});

export const updateOrderSchema = Joi.object({
  clientId: Joi.string().uuid().optional(),
  order_unique_id: Joi.string().uuid().optional(),
  created_at: Joi.date().optional()
});
