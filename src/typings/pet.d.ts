/**
 * 寵物資料來源
 *
 * @enum {string} gov 政府
 * @enum {string} map 認養地圖
 * @enum {string} own 使用者上傳
 */
type PetRefType = 'gov' | 'map' | 'own'

/**
 * 寵物性別
 *
 * @enum {string} F female
 * @enum {string} M male
 * @enum {string} U unknown
 */
type PetSexType = 'F' | 'M' | 'U'

/**
 * 寵物年齡
 *
 * @enum {string} F female
 * @enum {string} M male
 * @enum {string} U unknown
 */
type PetAgeType = 'A' | 'C' | 'U'

/**
 * 寵物狀態
 *
 * @enum {string} Unknown 未知
 * @enum {string} Open 開放認養
 * @enum {string} Adopted 已被認養
 * @enum {string} Other 其他
 * @enum {string} Dead 死亡
 */
type PetStatusType = 'Unknown' | 'Open' | 'Adopted' | 'Other' | 'Dead'

/**
 * 寵物狀態
 *
 * @enum {string} D 狗
 * @enum {string} C 貓
 * @enum {string} O 其他
 */
type PetKindType = 'D' | 'C' | 'O'

/**
 * 可排序欄位
 *
 * @enum {string} id 編碼
 * @enum {string} ref 資料來源
 * @enum {string} city_id 區域
 * @enum {string} kind 種類
 * @enum {string} sex 性別
 * @enum {string} color 顏色
 * @enum {string} age 年齡
 * @enum {string} created_at 建立時間
 * @enum {string} updated_at 更新時間
 */
type PetOrderType =
  | 'id'
  | 'ref'
  | 'city_id'
  | 'kind'
  | 'sex'
  | 'color'
  | 'age'
  | 'created_at'
  | 'updated_at'
/**
 * pet query
 *
 * @type {PetRefType} ref 資料來源
 * @type {PetAgeType} age 寵物年齡
 * @type {PetSexType} sex 寵物性別
 * @type {AreaRegionType} region 區域分佈
 * @type {PetOrderType} order 排序方式
 * @type {number} limit 限制傳回的資料筆數
 * @type {number} page 分頁
 */
interface PetQuery {
  city?: AreaCityType
  ref?: PetRefType
  age?: PetAgeType
  sex?: PetSexType
  region?: AreaRegionType
  order?: PetOrderType
  ascend?: number
  limit?: number
  page?: number
}
