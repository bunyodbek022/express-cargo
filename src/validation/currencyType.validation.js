import Joi from "joi";

export const createCurrencyTypeSchema = Joi.object({
  name: Joi.string().valid("cash", "card").required(),
  description: Joi.string().allow(null, "").optional()
});

export const updateCurrencyTypeSchema = Joi.object({
  name: Joi.string().valid("cash", "card").optional(),
  description: Joi.string().allow(null, "").optional()
});