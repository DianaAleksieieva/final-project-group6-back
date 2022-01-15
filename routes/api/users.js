import express from 'express';

import {
  authMiddleware,
  ctrlWrapperMiddleware,
} from '../../middlewares/index.js';
import { users } from '../../controllers/index.js';
const { getCurrent, verifyEmail, resendingEmail } = users;
const router = express.Router();

router.get('/current', authMiddleware, ctrlWrapperMiddleware(getCurrent));
router.get('/verify/:verificationToken', ctrlWrapperMiddleware(verifyEmail));
router.get('/verify', ctrlWrapperMiddleware(resendingEmail));
export default router;
