import express from 'express';

import {
  authMiddleware,
  validationMiddleware,
  ctrlWrapperMiddleware,
} from '../../middlewares/index.js';
import { auth } from '../../controllers/index.js';

import { joiSignUpSchema, joiSignInSchema } from '../../models/user.js';
const { signup, signin, signout } = auth;
const router = express.Router();

router.post(
  '/signup',
  validationMiddleware(joiSignUpSchema),
  ctrlWrapperMiddleware(signup),
);

router.post(
  '/signin',
  validationMiddleware(joiSignInSchema),
  ctrlWrapperMiddleware(signin),
);

router.post('/signout', authMiddleware, ctrlWrapperMiddleware(signout));

export default router;
