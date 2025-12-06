import { Response } from 'express';

export class ApiResponse {
  static success(res: Response, data: any = null, message: string = 'Success') {
    return res.status(200).json({
      success: true,
      message,
      data
    });
  }

  static created(res: Response, data: any, message: string = 'Created successfully') {
    return res.status(201).json({
      success: true,
      message,
      data
    });
  }

  static error(res: Response, message: string, statusCode: number = 500) {
    return res.status(statusCode).json({
      success: false,
      message,
      data: null
    });
  }

  static validationError(res: Response, errors: any[]) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
}

