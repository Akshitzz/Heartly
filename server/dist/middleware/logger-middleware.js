import { logger } from "../utils/logger.js";
export const loggerMiddleWare = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info('HTTP Request', {
            method: req.method,
            path: req.path,
            statusCode: req.statusCode,
            duration: `${duration}ms`,
            userAgent: req.get('user-agent')
        });
    });
    next();
};
