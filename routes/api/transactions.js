import express from 'express';
import { transactions as controller } from '../../controllers/index.js';
import {
  authMware,
  validationMware,
  ctrlWrapperMware,
} from '../../middlewares/index.js';
import { transactions as joiSchema } from '../../schemas/joi/index.js';
const {
  currentBallanseJoiSchema,
  addTransactionJoiSchema,
  categoryTransactionJoiSchema,
  typeTransactionJoiSchema,
} = joiSchema;
const {
  balanceUpdate,
  addTransaction,
  removeTransaction,
  getYearlyTransactionsByType,
  getAllMonthlyTransactions,
  getAllMonthlyByCategoryTransactions,
  getAllMonthlyByTypeTransactions,
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
  ctrlWrapperMware(addTransaction),
);

router.delete('/:id', authMware, ctrlWrapperMware(removeTransaction));

router.get(
  '/year/:year/:type',
  authMware,
  ctrlWrapperMware(getYearlyTransactionsByType),
);

router.get(
  '/month/:month/:year',
  authMware,
  ctrlWrapperMware(getAllMonthlyTransactions),
);

router.get(
  '/category/:month/:year',
  authMware,
  validationMware(categoryTransactionJoiSchema),
  ctrlWrapperMware(getAllMonthlyByCategoryTransactions),
);
router.get(
  '/type/:month/:year',
  authMware,
  validationMware(typeTransactionJoiSchema),
  ctrlWrapperMware(getAllMonthlyByTypeTransactions),
);

export default router;
