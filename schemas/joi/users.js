import Joi from 'joi';

export const joiRegisterSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
  userName: Joi.string().min(3).max(35).allow(''),
  password: Joi.string().min(6).max(10).required(),
});

export const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).max(10).required(),
});

export const emailTokenJoiSchema = Joi.object({
  emailToken: Joi.string().required(),
});

export const currentBallanseJoiSchema = Joi.object({
  currentBalance: Joi.number().required(),
});
