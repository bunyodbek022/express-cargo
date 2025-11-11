import Joi from "joi";

export const createAdminSchema = Joi.object({
  full_name: Joi.string().max(50).required(),
  password: Joi.string().min(6).required(),
  phone_number: Joi.string().pattern(/^[0-9]+$/).required(),
  email: Joi.string().email().required(),
  tg_link: Joi.string().uri().optional(),
  token: Joi.string().optional(),
  is_creator: Joi.boolean().default(false),
  is_active: Joi.boolean().default(false)
});

export const updateAdminSchema = Joi.object({
  full_name: Joi.string().max(50).optional(),
  password: Joi.string().min(6).optional(),
  phone_number: Joi.string().pattern(/^[0-9]+$/).optional(),
  email: Joi.string().email().optional(),
  tg_link: Joi.string().uri().optional(),
  token: Joi.string().optional(),
  is_creator: Joi.boolean().optional(),
  is_active: Joi.boolean().optional()
});