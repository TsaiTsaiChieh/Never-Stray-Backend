/**
 * 資料來源
 *
 * @enum {number} 1 true
 * @enum {number} 0 false
 * @enum {number} -1 undefined/unknown
 */
type triStateType = 1 | 0 | -1

/**
 * 排序方式
 *
 * @enum {string} ASC 升幂
 * @enum {string} DESC 降冪
 */
type OrderType = 'ASC' | 'DESC'

/**
 * SQL 錯誤訊息的架構
 *
 * @type {string} query - parameterized query
 * @type {string[]} parameters
 * @type {string} code
 * @type {number} errno
 * @type {string} sqlState
 * @type {string} sqlMessage - SQL error message
 * @type {string} sql - SQL raw query
 */
type SQLErrorType = {
  query: string
  parameters: string[]
  code: string,
  errno: number,
  sqlState: string,
  sqlMessage: string,
  sql: string,
}

/**
 * 錯誤訊息的架構
 *
 * @type {string} message
 * @type {string} [details]
 * @type {number} code - http status code
 * @enum {string} status - fail or error
 * @type {boolean} isOperational
 */
 type ErrorType = {
  message: string
  details?: string
  code: number,
  status: 'fail' | 'error',
  isOperational: boolean,
}
