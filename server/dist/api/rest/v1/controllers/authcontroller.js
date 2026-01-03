import { ApiResponse } from '../../../../utils/response.js';
import { logger } from '../../../../utils/logger.js';
import { AuthService } from '../../../../services/auth-service.js';
export class AuthController {
    constructor() {
        this.register = async (req, res, next) => {
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
            }
            catch (error) {
                next(error);
            }
        };
        this.login = async (req, res, next) => {
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
            }
            catch (error) {
                next(error);
            }
        };
        this.refreshToken = async (req, res, next) => {
            try {
                const { refreshToken } = req.body;
                const result = await this.authService.refreshAccessToken(refreshToken);
                return ApiResponse.success(res, result, 'Token refreshed successfully');
            }
            catch (error) {
                next(error);
            }
        };
        this.logout = async (req, res, next) => {
            try {
                const userId = req.user.id;
                const { refreshToken } = req.body;
                await this.authService.logout(userId, refreshToken);
                logger.info(`User logged out: ${userId}`);
                return ApiResponse.success(res, null, 'Logout successful');
            }
            catch (error) {
                next(error);
            }
        };
        this.forgotPassword = async (req, res, next) => {
            try {
                const { email } = req.body;
                await this.authService.forgotPassword(email);
                return ApiResponse.success(res, null, 'Password reset email sent');
            }
            catch (error) {
                next(error);
            }
        };
        this.resetPassword = async (req, res, next) => {
            try {
                const { token } = req.params;
                const { password } = req.body;
                await this.authService.resetPassword(token, password);
                logger.info('Password reset successful');
                return ApiResponse.success(res, null, 'Password reset successful');
            }
            catch (error) {
                next(error);
            }
        };
        this.changePassword = async (req, res, next) => {
            try {
                const userId = req.user.id;
                const { currentPassword, newPassword } = req.body;
                await this.authService.changePassword(userId, currentPassword, newPassword);
                logger.info(`Password changed for user: ${userId}`);
                return ApiResponse.success(res, null, 'Password changed successfully');
            }
            catch (error) {
                next(error);
            }
        };
        this.getCurrentUser = async (req, res, next) => {
            try {
                const userId = req.user.id;
                const user = await this.authService.getCurrentUser(userId);
                return ApiResponse.success(res, user);
            }
            catch (error) {
                next(error);
            }
        };
        this.authService = new AuthService();
    }
}
