/* eslint-disable require-jsdoc */
import {HttpStatus} from 'http-status'

export class AppError extends Error {
  protected statusCode: HttpStatus
  protected status: string
  protected isOperational: boolean

  constructor(message: string, statusCode: HttpStatus) {
    super(message)
		this.statusCode = statusCode
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
		this.isOperational = true
		Error.captureStackTrace(this, this.constructor)
	}
}
