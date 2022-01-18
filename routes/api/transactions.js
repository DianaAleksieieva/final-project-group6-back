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
  yearParamsJoiSchema,
  idParamsJoiSchema,
  setTransactionJoiSchema,
} = joiSchema;
const {
  balanceUpdate,
  addTransactionController,
  removeTransactionController,
  getYearlyByTypeController,
  getMonthlyByTypeController,
  getAllMonthlyByCategoryController,
  getAllMonthlyByTypeTransactions,
  putSetOfTransactionsController,
} = controller;
const router = express.Router();

router.put(
  '/balance',
  authMware,
  validationMware(currentBallanseJoiSchema),
  ctrlWrapperMware(balanceUpdate),
);

router.post(
  '/add',
  authMware,
  validationMware(addTransactionJoiSchema),
  ctrlWrapperMware(addTransactionController),
);

router.delete(
  '/:id',
  authMware,
  paramsValidationMware(idParamsJoiSchema),
  ctrlWrapperMware(removeTransactionController),
);

router.put(
  '/set/:year/:month/:count',
  authMware,
  paramsValidationMware(setTransactionJoiSchema),
  ctrlWrapperMware(putSetOfTransactionsController),
);

router.get(
  '/get/:year',
  authMware,
  paramsValidationMware(yearParamsJoiSchema),
  validationMware(typeTransactionJoiSchema),
  ctrlWrapperMware(getYearlyByTypeController),
);

router.get(
  '/get/:year/:month',
  authMware,
  validationMware(typeTransactionJoiSchema),
  paramsValidationMware(monthYearParamsJoiSchema),
  ctrlWrapperMware(getMonthlyByTypeController),
);

router.get(
  '/category/:year/:month/',
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
