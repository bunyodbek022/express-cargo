import Joi from "joi";

export const loginClientScheme = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const createClientSchema = Joi.object({
  full_name: Joi.string().max(50).required(),
  phone_number: Joi.string().pattern(/^[0-9]+$/).required(),
  address: Joi.string().max(50).required(),
  location: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  tg_link: Joi.string().uri().optional(),
  token: Joi.string().optional()
});


export const updateClientSchema = Joi.object({
  full_name: Joi.string().max(50).optional(),
  phone_number: Joi.string().pattern(/^[0-9]+$/).optional(),
  address: Joi.string().max(50).optional(),
  location: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  tg_link: Joi.string().uri().optional(),
  token: Joi.string().optional(),
});