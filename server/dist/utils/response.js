export class ApiResponse {
    static success(res, data = null, message = 'Success') {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    }
    static created(res, data, message = 'Created successfully') {
        return res.status(201).json({
            success: true,
            message,
            data
        });
    }
    static error(res, message, statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message,
            data: null
        });
    }
    static validationError(res, errors) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }
}
