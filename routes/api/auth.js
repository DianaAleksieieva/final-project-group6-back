import express from 'express';
import {
  authMware,
  validationMware,
  ctrlWrapperMware,
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

router.get('/logout', authMware, ctrlWrapperMware(auth.logoutController));

router.get('/current', authMware, ctrlWrapperMware(auth.getCurrentController));

export default router;
