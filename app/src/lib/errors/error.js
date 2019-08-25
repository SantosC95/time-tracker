class ApplicationError extends Error {
    constructor(message, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message ||
            'Something went wrong. Please try again.';
        this.status = status || 500;
    }
}

export class UserCreationError extends ApplicationError {
    constructor(message, details) {
        super(message || 'There has been an error when creating a user', 400);
        this.details = details
    }
}

export class DuplicateEmailError extends ApplicationError {
    constructor(message) {
        super(message || 'Duplicate email! Please try another value', 400);
    }
}

export class InvalidPassword extends ApplicationError {
    constructor(message) {
        super(
            message || 'Password must be six (6) or more alphanumeric characters', 
            400
        );
    }
}

export class UserNotFoundError extends ApplicationError {
    constructor(message) {
        super(message || 'No User found.', 404);
    }
}

export class InvalidCredentialsError extends ApplicationError {
    constructor(message) {
        super(message || 'Invalid credentials.', 401);
    }
}

export class InvalidTokenError extends ApplicationError {
    constructor(message) {
        super(message || 'Invalid Session. Please try login again', 401);
    }
}

export class SessionExpiredError extends ApplicationError {
    constructor(message) {
        super(message || 'Session has expired. Please try login again', 401);
    }
}

export class MaxSessionsError extends ApplicationError {
    constructor(message, details) {
        super(message || 'Maximum number of allowed sessions reached. Please use or close one of the active sessions', 401);
        this.details = details
    }
}