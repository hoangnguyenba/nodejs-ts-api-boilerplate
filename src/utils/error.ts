const httpStatus = require('http-status');

export interface ErrorAgrs {
    name?: string;
    message: string;
    errors?: any[];
    status?: number;
    stack?: any;
    isPublic?: boolean;
    isOperational?: boolean;
}

/**
 * @extends Error
 */
export class ExtendableError extends Error {
    errors: any[];
    status: number;
    isPublic: boolean;
    isOperational: boolean;
    constructor({message, errors, status, isPublic, stack}: ErrorAgrs) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        this.stack = stack;
        // Error.captureStackTrace(this, this.constructor.name);
    }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class APIError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor({
        name,
        message,
        errors,
        stack,
        status = httpStatus.INTERNAL_SERVER_ERROR,
        isPublic = false
    }: ErrorAgrs) {
        super({
            errors, isPublic, message, name, stack, status,
        });
    }
}
