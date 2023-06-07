import { errors } from "express-validation";
import httpStatus from "http-status";

/**
 * @extends Error
 */

class ExtendableError extends Error {
  statusCode: number;
  isPublic: boolean;
  isOperational: boolean;

  constructor(message: string | errors, statusCode: number, isPublic: boolean = false) {
    super(message as string);
    this.name = this.constructor.name;
    this.message = message as string;
    this.statusCode = statusCode;
    this.isPublic = isPublic;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} statusCode - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message: string | errors, statusCode: number = httpStatus.INTERNAL_SERVER_ERROR, isPublic: boolean = false) {
    super(message, statusCode, isPublic);
  }
}

export default APIError;
