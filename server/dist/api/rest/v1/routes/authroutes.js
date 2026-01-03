import { Router } from 'express';
import { rateLimiter } from '../../../../middleware/rate-limit.middleware.js';
import { AuthController } from '../controllers/authcontroller.js';
import { validateRequest } from '../../../../middleware/validation-middleware.js';
import { authValidator } from '../../../../validators/auth-validator.js';
import { authMiddleWare } from '../../../../middleware/auth-middleware.js';
const router = Router();
const authController = new AuthController();
// access to all
router.post('/register', rateLimiter({ max: 5, windowMs: 15 * 60 * 1000 }), authController.register);
router.post('/login', rateLimiter({ max: 10, windowMs: 15 * 60 * 1000 }), validateRequest(authValidator.login), authController.login);
router.post('/refresh-token', validateRequest(authValidator.refreshToken), authController.refreshToken);
router.post('/forgot-password', rateLimiter({ max: 3, windowMs: 60 * 60 * 1000 }), validateRequest(authValidator.forgotPassword), authController.forgotPassword);
router.post('/reset-password/:token', validateRequest(authValidator.resetPassword), authController.resetPassword);
// router.post('/verify-email/:token', 
//   authController.verifyEmail
// );
// router.post('/resend-verification', 
//   rateLimiter({ max: 3, windowMs: 60 * 60 * 1000 }),
//   validateRequest(authValidator.resendVerification), 
//   authController.resendVerification
// );
// Protected routes - signed in user only 
router.post('/logout', authMiddleWare, authController.logout);
router.post('/change-password', authMiddleWare, validateRequest(authValidator.changePassword), authController.changePassword);
router.get('/me', authMiddleWare, authController.getCurrentUser);
export default router;
