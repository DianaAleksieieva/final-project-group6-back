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

const currentBallanseJoiSchema = Joi.object({
  currentBalance: Joi.number().required(),
});

const addTransactionJoiSchema = Joi.object({
  type: joyType,
  date: Joi.date().required(),
  category: joyCategory,
  amount: Joi.number().min(1).required(),
  description: Joi.string(),
});

const categoryJoiSchema = Joi.object({
  category: joyCategory,
});
const typeJoiSchema = Joi.object({
  type: joyType,
});
const yearJoiSchema = Joi.object({
  year: Joi.number().required().min(2015).max(2100),
});
const idJoiSchema = Joi.object({
  id: Joi.string().required(),
});

const yearTypeJoiSchema = Joi.object({
  year: Joi.number().required().min(2015).max(2100),
  type: Joi.string().required().valid('income', 'expense'),
});

const categoryMonthYearJoiSchema = Joi.object({
  category: joyCategory,
  month: Joi.number().required().min(1).max(12),
  year: Joi.number().required().min(2015).max(2100),
});
const typeMonthYearJoiSchema = Joi.object({
  type: joyType,
  month: Joi.number().required().min(1).max(12),
  year: Joi.number().required().min(2015).max(2100),
});
const setTransactionJoiSchema = Joi.object({
  count: Joi.number().required().min(2).max(8),
  month: Joi.number().required().min(1).max(12),
  year: Joi.number().required().min(2015).max(2100),
});

export default {
  currentBallanseJoiSchema,
  addTransactionJoiSchema,
  categoryJoiSchema,
  typeJoiSchema,
  yearJoiSchema,
  idJoiSchema,
  yearTypeJoiSchema,
  categoryMonthYearJoiSchema,
  typeMonthYearJoiSchema,
  setTransactionJoiSchema,
};
