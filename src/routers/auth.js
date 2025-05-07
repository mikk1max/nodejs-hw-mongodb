import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginWithGoogleOAuthSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  userLoginSchema,
  userRegisterSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getGoogleOAuthUrlController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController,
  signUpOrLoginWithGoogleController,
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

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(signUpOrLoginWithGoogleController),
);

export default authRouter;
