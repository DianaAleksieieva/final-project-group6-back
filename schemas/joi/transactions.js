import Joi from 'joi';
const joyCategory = Joi.string()
  .required()
  .valid(
    'transport',
    'goods',
    'health',
    'alco',
    'fun',
    'house',
    'tech',
    'utilities',
    'sport',
    'education',
    'other',
    'salary',
    'freelance',
  );

const joyType = Joi.string().required().valid('income', 'expense');

export const addTransactionJoiSchema = Joi.object({
  type: joyType,
  date: Joi.date().required(),
  category: joyCategory,
  amount: Joi.number().min(1).required(),
  description: Joi.string(),
});

export const categoryJoiSchema = Joi.object({
  category: joyCategory,
});
export const typeJoiSchema = Joi.object({
  type: joyType,
});
export const yearJoiSchema = Joi.object({
  year: Joi.number().required().min(2015).max(2100),
});
export const idJoiSchema = Joi.object({
  id: Joi.string().required(),
});

export const yearTypeJoiSchema = Joi.object({
  year: Joi.number().required().min(2015).max(2100),
  type: joyType,
});

export const categoryMonthYearJoiSchema = Joi.object({
  category: joyCategory,
  month: Joi.number().required().min(1).max(12),
  year: Joi.number().required().min(2015).max(2100),
});
export const typeMonthYearJoiSchema = Joi.object({
  type: joyType,
  month: Joi.number().required().min(1).max(12),
  year: Joi.number().required().min(2015).max(2100),
});
export const setTransactionJoiSchema = Joi.object({
  count: Joi.number().required().min(2).max(8),
  month: Joi.number().required().min(1).max(12),
  year: Joi.number().required().min(2015).max(2100),
});
