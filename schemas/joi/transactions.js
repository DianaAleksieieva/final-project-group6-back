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
});

const categoryTransactionJoiSchema = Joi.object({
  categories: Joi.array().items(
    Joi.string().valid(
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
  ),
});

const typeTransactionJoiSchema = Joi.object({
  type: Joi.string().required().valid('income', 'expense'),
});

const monthYearParamsJoiSchema = Joi.object({
  month: Joi.number().required(),
  year: Joi.number().required(),
});

const yearTypeParamsJoiSchema = Joi.object({
  year: Joi.number().required(),
  type: Joi.string().required().valid('income', 'expense'),
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
  idParamsJoiSchema,
};
