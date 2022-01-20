import express from 'express';
import {
  authMware,
  validationMware,
  ctrlWrapperMware,
  paramsValidationMware,
} from '../../middlewares/index.js';
import { auth } from '../../controllers/index.js';
import { users } from '../../schemas/joi/index.js';
const router = express.Router();

router.post(
  '/register',
  validationMware(users.joiRegisterSchema),
  ctrlWrapperMware(auth.registerController),
);

router.post(
  '/login',
  validationMware(users.joiLoginSchema),
  ctrlWrapperMware(auth.loginController),
);

router.post('/logout', authMware, ctrlWrapperMware(auth.logoutController));

router.get(
  '/verify/:emailToken',
  paramsValidationMware(users.emailTokenJoiSchema),
  ctrlWrapperMware(auth.verifyEmailTokenController),
);

router.get('/google', ctrlWrapperMware(auth.googleAuthController));

router.get('/google-redirect', ctrlWrapperMware(auth.googleRedirectController));

router.get('/google', ctrlWrapperMware(auth.google.googleAuthController));

router.get(
  '/google-redirect',
  ctrlWrapperMware(auth.google.googleRedirectController),
);

export default router;
