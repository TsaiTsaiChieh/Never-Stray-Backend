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