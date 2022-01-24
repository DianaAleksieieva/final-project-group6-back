import express from 'express';
import {
  addTransactionController,
  removeTransactionController,
  getYearlyByTypeController,
  getMonthlyByTypeController,
  getAllMonthlyByCategoryController,
  putSetOfTransactionsController,
  getLastHalfYearByTypeController,
} from '../../controllers/transactions/index.js';
import {
  authMware,
  validationMware,
  paramsValidationMware,
  ctrlWrapperMware,
} from '../../middlewares/index.js';
import {
  addTransactionJoiSchema,
  idJoiSchema,
  yearTypeJoiSchema,
  categoryMonthYearJoiSchema,
  typeMonthYearJoiSchema,
  setTransactionJoiSchema,
  typeJoiSchema,
} from '../../schemas/joi/transactions.js';

const router = express.Router();

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
// TODO
// router.get(
//   '/getByType/:type',
//   authMware,
//   paramsValidationMware(typeJoiSchema),
//   ctrlWrapperMware(getByTypeController),
// );

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

router.get(
  '/getLastHalfYearByType/:type/',
  // authMware,
  paramsValidationMware(typeJoiSchema),
  ctrlWrapperMware(getLastHalfYearByTypeController),
);

export default router;
