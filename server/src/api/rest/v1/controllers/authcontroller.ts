import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/utils/response';
import { logger } from '@/utils/logger';
import { AuthService } from '@/services/auth-service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, firstName, lastName, role, phoneNumber } = req.body;

      const result = await this.authService.register({
        email,
        password,
        firstName,
        lastName,
        role,
        phoneNumber
      });

      logger.info(`User registered successfully: ${email}`);

      return ApiResponse.created(res, result, 'Registration successful. Please verify your email.');
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, deviceInfo } = req.body;

      const result = await this.authService.login({
        email,
        password,
        deviceInfo,
        ipAddress: req.ip
      });

      logger.info(`User logged in: ${email}`);

      return ApiResponse.success(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;

      const result = await this.authService.refreshAccessToken(refreshToken);

      return ApiResponse.success(res, result, 'Token refreshed successfully');
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const { refreshToken } = req.body;

      await this.authService.logout(userId, refreshToken);

      logger.info(`User logged out: ${userId}`);

      return ApiResponse.success(res, null, 'Logout successful');
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      await this.authService.forgotPassword(email);

      return ApiResponse.success(res, null, 'Password reset email sent');
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      await this.authService.resetPassword(token, password);

      logger.info('Password reset successful');

      return ApiResponse.success(res, null, 'Password reset successful');
    } catch (error) {
      next(error);
    }
  };

  verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.params;

      await this.authService.verifyEmail(token);

      logger.info('Email verified successfully');

      return ApiResponse.success(res, null, 'Email verified successfully');
    } catch (error) {
      next(error);
    }
  };

  resendVerification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      await this.authService.resendVerificationEmail(email);

      return ApiResponse.success(res, null, 'Verification email sent');
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const { currentPassword, newPassword } = req.body;

      await this.authService.changePassword(userId, currentPassword, newPassword);

      logger.info(`Password changed for user: ${userId}`);

      return ApiResponse.success(res, null, 'Password changed successfully');
    } catch (error) {
      next(error);
    }
  };

  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;

      const user = await this.authService.getCurrentUser(userId);

      return ApiResponse.success(res, user);
    } catch (error) {
      next(error);
    }
  };
}
