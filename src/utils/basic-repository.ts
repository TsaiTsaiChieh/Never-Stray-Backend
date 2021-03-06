import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  getRepository,
  ObjectType,
  Repository,
  UpdateResult,
} from 'typeorm'
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity'

/** Class representing a basic repository  */
export class BasicRepository<T> {
  protected repository: Repository<T>
  private entity: ObjectType<T>
  /**
   * @param  {ObjectType<T>} entity
   */
  constructor(entity: ObjectType<T>) {
    this.entity = entity
    this.repository = getRepository(entity)
  }

  /**
   * 儲存單一 Entity<T> 的資料
   *
   * @param  {T} data - Single data to save
   * @return {Promise<T>}
   */
  save(data: T): Promise<T> {
    return this.repository.save(data)
  }

  /**
   * 儲存多筆 Entity<T> 的資料
   *
   * @param  {T} data - Multiple data to save
   * @return {Promise<T>}
   */
  saveMany(data: T[]): Promise<T[]> {
    return this.repository.save(data)
  }

  /**
   * 尋找資料
   *
   * @param  {FindConditions<T>[]} [condition] - Used for find operations
   * @return {Promise<T>}
   */
  find(condition?: FindConditions<T>[]): Promise<T[]> {
    const options: FindManyOptions<T> = {
      where: condition,
    }
    return this.repository.find(options)
  }

  /**
   * 尋找符合條件的第一筆資料
   *
   * @param  {FindConditions<T>} [conditions] - Used for find operations
   * @param  {FindOneOptions<T>} [options] - Special criteria, like: select,
   * where, relation, join, order
   * @return {Promise<T|undefined>}
   */
  findOne(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<T | undefined> {
    return this.repository.findOne(conditions, options)
  }
  /**
   * 更新指定欄位的資料
   *
   * @param  {FindConditions<T>} conditions - Given conditions
   * @param  {QueryDeepPartialEntity<T>} data - Updates entity partially
   * @return {Promise<UpdateResult>}
   */
  update(
    conditions: FindConditions<T>,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return this.repository.update(conditions, data)
  }
}
