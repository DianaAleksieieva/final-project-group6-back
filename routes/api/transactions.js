import express from 'express';
import { transactions as controller } from '../../controllers/index.js';
import {
  authMware,
  validationMware,
  paramsValidationMware,
  ctrlWrapperMware,
} from '../../middlewares/index.js';
import { transactions as joiSchema } from '../../schemas/joi/index.js';
const {
  currentBallanseJoiSchema,
  addTransactionJoiSchema,
  categoryTransactionJoiSchema,
  typeTransactionJoiSchema,
  monthYearParamsJoiSchema,
  yearTypeParamsJoiSchema,
  idParamsJoiSchema,
} = joiSchema;
const {
  balanceUpdate,
  addTransaction,
  removeTransaction,
  getYearlyByTypeController,
  getAllMonthlyTransactions,
  getAllMonthlyByCategoryController,
  getAllMonthlyByTypeTransactions,
} = controller;
const router = express.Router();

router.post(
  '/balance',
  authMware,
  validationMware(currentBallanseJoiSchema),
  ctrlWrapperMware(balanceUpdate),
);

router.post(
  '/add',
  authMware,
  validationMware(addTransactionJoiSchema),
  ctrlWrapperMware(addTransaction),
);

router.delete(
  '/:id',
  authMware,
  paramsValidationMware(idParamsJoiSchema),
  ctrlWrapperMware(removeTransaction),
);
router.get(
  '/year/:year/:type',
  authMware,
  paramsValidationMware(yearTypeParamsJoiSchema),
  ctrlWrapperMware(getYearlyByTypeController),
);

router.get(
  '/month/:month/:year',
  authMware,
  paramsValidationMware(monthYearParamsJoiSchema),
  ctrlWrapperMware(getAllMonthlyTransactions),
);

router.get(
  '/category/:month/:year',
  authMware,
  paramsValidationMware(monthYearParamsJoiSchema),
  validationMware(categoryTransactionJoiSchema),
  ctrlWrapperMware(getAllMonthlyByCategoryController),
);
router.get(
  '/type/:month/:year',
  authMware,
  paramsValidationMware(monthYearParamsJoiSchema),
  validationMware(typeTransactionJoiSchema),
  ctrlWrapperMware(getAllMonthlyByTypeTransactions),
);

export default router;
