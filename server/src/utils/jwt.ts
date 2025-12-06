import * as jwt from "jsonwebtoken";
import { AppError } from "./error-handler";

export class JWTUtil {
  static generateAccessToken(userId: string, role: string): string {
    return jwt.sign(
      { userId, role, type: 'access' },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId, type: "refresh" },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
    );
  }

  static verifyAccessToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      throw new AppError('Invalid or expired token', 401);
    }
  }

  static verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      throw new AppError('Invalid or expired refresh token', 401);
    }
  }
}