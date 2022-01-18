import Joi from 'joi';

const joiRegisterSchema = Joi.object({
  userName: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const emailTokenJoiSchema = Joi.object({
  emailToken: Joi.string().required(),
});

export default { joiLoginSchema, joiRegisterSchema, emailTokenJoiSchema };
