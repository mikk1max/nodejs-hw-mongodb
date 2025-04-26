import Joi from 'joi';
import { emailRegexPattern } from '../constants/index.js';

export const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(emailRegexPattern).required(),
  password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexPattern).required(),
  password: Joi.string().min(6).required(),
});
