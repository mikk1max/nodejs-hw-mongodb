import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { userLoginSchema, userRegisterSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  refreshUserSessionController,
  userLoginController,
  userLogoutController,
  userRegisterController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrlWrapper(userRegisterController),
);

authRouter.post(
  '/login',
  validateBody(userLoginSchema),
  ctrlWrapper(userLoginController),
);

authRouter.post('/logout', ctrlWrapper(userLogoutController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter;
