/* eslint-disable require-jsdoc */
import httpStatus from 'http-status'

import {redLog} from './chalk-logger'

export class AppError extends Error {
  protected details: string | undefined
  protected code: number
  protected status: string
  protected isOperational: boolean

  constructor(
    message: string,
    details?: any,
    isOperational: boolean = true,
    code: number = httpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super()
    this.message = message
    this.details = details
    this.code = code
    this.isOperational = isOperational
    this.status = `${code}`.startsWith('4') ? 'fail' : 'error'
    Error.captureStackTrace(this, this.constructor)
    redLog(message)
  }
}

/* === 500 INTERNAL SERVER ERROR === */
export class DBError extends AppError {
  constructor(
    message: string = 'MySQL 錯誤',
    details: any,
    isOperational: boolean = true,
    code: number = httpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message, details, isOperational, code)
  }
}
