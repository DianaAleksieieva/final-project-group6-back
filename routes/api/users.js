import express from 'express';
import {
  balanceUpdateController,
  getCurrentController,
  refreshTokenController,
} from '../../controllers/users/index.js';
import {
  authMware,
  ctrlWrapperMware,
  bodyValidationMware,
} from '../../middlewares/index.js';
import { currentBallanseJoiSchema } from '../../schemas/joi/users.js';

const router = express.Router();

router.get('/current', authMware, ctrlWrapperMware(getCurrentController));

router.get('/token/refresh', ctrlWrapperMware(refreshTokenController));

router.put(
  '/balance',
  authMware,
  bodyValidationMware(currentBallanseJoiSchema),
  ctrlWrapperMware(balanceUpdateController),
);

export default router;
