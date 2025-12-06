
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import  User  from '@/models/user.model.js';
import { JWTUtil } from '@/utils/jwt';

// import { EmailService } from './email.service';

import { AppError } from '@/utils/error-handler';
import { logger } from '@/utils/logger';
import { RedisClient } from '@/cache/redis-client';

export class AuthService {
//   private emailService: EmailService;
  private redisClient: RedisClient;

  constructor() {
    // this.emailService = new EmailService();
    this.redisClient = new RedisClient();
  }

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'patient' | 'doctor' | 'admin';
    phoneNumber: string;
  }) {
    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError('User already exists with this email', 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await User.create({
      ...data,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
      emailVerificationExpiry: verificationTokenExpiry,
      isEmailVerified: false
    });

    // Send verification email
    // await this.emailService.sendVerificationEmail(user.email, verificationToken);

    // Generate tokens
    const accessToken = JWTUtil.generateAccessToken(user.id, user.role);
    const refreshToken = JWTUtil.generateRefreshToken(user.id);

    // Store refresh token in Redis
    await this.redisClient.set(
      `refresh_token:${user.id}`,
      refreshToken,
      7 * 24 * 60 * 60 // 7 days
    );

    return {
      user: user.toJSON(),
      tokens: {
        accessToken,
        refreshToken
      }
    };
  }

  async login(data: {
    email: string;
    password: string;
    deviceInfo?: string;
    ipAddress?: string;
  }) {
    const user = await User.findOne({ email: data.email }).select('+password');

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      throw new AppError('Please verify your email before logging in', 403);
    }

    // Check if account is active
    if (user.status !== 'active') {
      throw new AppError('Your account is inactive. Please contact support', 403);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const accessToken = JWTUtil.generateAccessToken(user.id, user.role);
    const refreshToken = JWTUtil.generateRefreshToken(user.id);

    // Store refresh token
    await this.redisClient.set(
      `refresh_token:${user.id}`,
      refreshToken,
      7 * 24 * 60 * 60
    );

    logger.info(`User login: ${user.email} from IP: ${data.ipAddress}`);

    return {
      user: user.toJSON(),
      tokens: {
        accessToken,
        refreshToken
      }
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = JWTUtil.verifyRefreshToken(refreshToken);

      // Check if refresh token exists in Redis
    //   const storedToken = await this.redisClient.get(`refresh_token:${decoded.userId}`);
    //   if (!storedToken || storedToken !== refreshToken) {
    //     throw new AppError('Invalid refresh token', 401);
    //   }

      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Generate new access token
      const newAccessToken = JWTUtil.generateAccessToken(user.id, user.role);

      return {
        accessToken: newAccessToken
      };
    } catch (error) {
      throw new AppError('Invalid or expired refresh token', 401);
    }
  }

  async logout(userId: string, refreshToken?: string) {
    // Remove refresh token from Redis
    await this.redisClient.delete(`refresh_token:${userId}`);

    // Optionally blacklist the refresh token
    if (refreshToken) {
      await this.redisClient.set(
        `blacklisted_token:${refreshToken}`,
        'true',
        7 * 24 * 60 * 60
      );
    }
  }

  async forgotPassword(email: string) {
    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.passwordResetToken = resetToken;
    user.passwordResetExpiry = resetTokenExpiry;
    await user.save();

    // Send reset email
    // await this.emailService.sendPasswordResetEmail(user.email, resetToken);
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpiry: { $gt: new Date() }
    });

    if (!user) {
      throw new AppError('Invalid or expired reset token', 400);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save();

    // Invalidate all refresh tokens
    await this.redisClient.delete(`refresh_token:${user.id}`);
  }

  async verifyEmail(token: string) {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpiry: { $gt: new Date() }
    });

    if (!user) {
      throw new AppError('Invalid or expired verification token', 400);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save();
  }

  async resendVerificationEmail(email: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.isEmailVerified) {
      throw new AppError('Email already verified', 400);
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpiry = verificationTokenExpiry;
    await user.save();

    // await this.emailService.sendVerificationEmail(user.email, verificationToken);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError('Current password is incorrect', 401);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    await user.save();

    // Invalidate all refresh tokens
    await this.redisClient.delete(`refresh_token:${user.id}`);
  }

  async getCurrentUser(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}