import Joi from "joi";

export const createOrderProductSchema = Joi.object({
  orderId: Joi.string().uuid().required(),
  productId: Joi.string().uuid().required(),
  currencyTypeId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(1).default(1),
  summa: Joi.number().precision(2).required(),
  truck: Joi.string().allow(null, "").optional(),
  description: Joi.string().allow(null, "").optional(),
  created_at: Joi.date().optional()
});

export const updateOrderProductSchema = Joi.object({
  orderId: Joi.string().uuid().optional(),
  productId: Joi.string().uuid().optional(),
  currencyTypeId: Joi.string().uuid().optional(),
  quantity: Joi.number().integer().min(1).optional(),
  summa: Joi.number().precision(2).optional(),
  truck: Joi.string().allow(null, "").optional(),
  description: Joi.string().allow(null, "").optional(),
  created_at: Joi.date().optional()
});