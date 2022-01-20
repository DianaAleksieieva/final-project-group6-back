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
  idJoiSchema,
  yearTypeJoiSchema,
  categoryMonthYearJoiSchema,
  typeMonthYearJoiSchema,
  setTransactionJoiSchema,
} = joiSchema;
const {
  balanceUpdate,
  addTransactionController,
  removeTransactionController,
  getYearlyByTypeController,
  getMonthlyByTypeController,
  getAllMonthlyByCategoryController,
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
  '/delete/:id',
  authMware,
  paramsValidationMware(idJoiSchema),
  ctrlWrapperMware(removeTransactionController),
);

router.put(
  '/set/:year/:month/:count',
  authMware,
  paramsValidationMware(setTransactionJoiSchema),
  ctrlWrapperMware(putSetOfTransactionsController),
);

router.get(
  '/getByType/:type/:year',
  authMware,
  paramsValidationMware(yearTypeJoiSchema),
  ctrlWrapperMware(getYearlyByTypeController),
);

router.get(
  '/getByType/:type/:year/:month',
  authMware,
  paramsValidationMware(typeMonthYearJoiSchema),
  ctrlWrapperMware(getMonthlyByTypeController),
);

router.get(
  '/getByCategory/:category/:year/:month/',
  authMware,
  paramsValidationMware(categoryMonthYearJoiSchema),
  ctrlWrapperMware(getAllMonthlyByCategoryController),
);

export default router;
