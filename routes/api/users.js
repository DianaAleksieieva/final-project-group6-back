import express from 'express';
import { authMware, ctrlWrapperMware } from '../../middlewares/index.js';
import { users } from '../../controllers/index.js';

const router = express.Router();

router.get('/current', authMware, ctrlWrapperMware(users.getCurrentController));

router.get('/token/refresh', ctrlWrapperMware(users.refreshTokenController));

export default router;
