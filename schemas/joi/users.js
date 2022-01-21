import Joi from 'joi';

export const joiRegisterSchema = Joi.object({
  userName: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const emailTokenJoiSchema = Joi.object({
  emailToken: Joi.string().required(),
});

export const currentBallanseJoiSchema = Joi.object({
  currentBalance: Joi.number().required(),
});
