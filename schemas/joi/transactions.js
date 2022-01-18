import Joi from 'joi';

const currentBallanseJoiSchema = Joi.object({
  currentBalance: Joi.number().required(),
});

const addTransactionJoiSchema = Joi.object({
  type: Joi.string().required().valid('income', 'expense'),
  date: Joi.date().required(),
  category: Joi.string()
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
    ),
  amount: Joi.number().min(1).required(),
  description: Joi.string(),
});

const categoryTransactionJoiSchema = Joi.object({
  category: Joi.string()
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
    ),
});

const typeTransactionJoiSchema = Joi.object({
  type: Joi.string().required().valid('income', 'expense'),
});

const monthYearParamsJoiSchema = Joi.object({
  month: Joi.number().required().min(1).max(12),
  year: Joi.number().required().min(2015).max(2100),
});
const setTransactionJoiSchema = Joi.object({
  month: Joi.number().required().min(1).max(12),
  year: Joi.number().required().min(2015).max(2100),
  count: Joi.number().required().min(2).max(8),
});

const yearTypeParamsJoiSchema = Joi.object({
  year: Joi.number().required().min(2015).max(2100),
  type: Joi.string().required().valid('income', 'expense'),
});
const yearParamsJoiSchema = Joi.object({
  year: Joi.number().required().min(2015).max(2100),
});

const idParamsJoiSchema = Joi.object({
  id: Joi.string().required(),
});

export default {
  currentBallanseJoiSchema,
  addTransactionJoiSchema,
  categoryTransactionJoiSchema,
  typeTransactionJoiSchema,
  monthYearParamsJoiSchema,
  yearTypeParamsJoiSchema,
  yearParamsJoiSchema,
  idParamsJoiSchema,
  setTransactionJoiSchema,
};
