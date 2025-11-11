import Joi from "joi";


export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null, "").optional()
});

export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow(null, "").optional()
});