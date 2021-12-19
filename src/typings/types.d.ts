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
  code: number
  status: 'fail' | 'error'
  isOperational: boolean
}
