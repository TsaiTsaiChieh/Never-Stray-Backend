
import httpStatus from 'http-status'
import {HttpStatus} from 'http-status'
/**
 * Custom error
 * @extends Error
 * @class AppError
 */
export class AppError extends Error {
  protected statusCode: number
  protected status: string
  protected isOperational: boolean
  /**
     * Creates an instance of AppError.
     * @param {string} message error message
     * @param {HttpStatus} statusCode http status code, default is
     * INTERNAL_SERVER_ERROR (500)
     */
  constructor(message: string,
    statusCode: number = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}
