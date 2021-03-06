import express from 'express';
import {
  authMware,
  validationMware,
  ctrlWrapperMware,
  paramsValidationMware,
} from '../../middlewares/index.js';
import {
  registerController,
  loginController,
  logoutController,
  verifyEmailTokenController,
  googleRedirectController,
  googleAuthController,
} from '../../controllers/auth/index.js';
import {
  joiRegisterSchema,
  joiLoginSchema,
  emailTokenJoiSchema,
} from '../../schemas/joi/users.js';
const router = express.Router();

router.post(
  '/register',
  validationMware(joiRegisterSchema),
  ctrlWrapperMware(registerController),
);

router.post(
  '/login',
  validationMware(joiLoginSchema),
  ctrlWrapperMware(loginController),
);

router.post('/logout', authMware, ctrlWrapperMware(logoutController));

router.get(
  '/verify/:emailToken',
  paramsValidationMware(emailTokenJoiSchema),
  ctrlWrapperMware(verifyEmailTokenController),
);

router.get('/google', ctrlWrapperMware(googleAuthController));

router.get('/google-redirect', ctrlWrapperMware(googleRedirectController));

export default router;
