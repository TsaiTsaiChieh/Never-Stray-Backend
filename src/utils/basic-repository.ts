import {getRepository, ObjectType, Repository} from 'typeorm'

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
   * @param  {T} data - Single data to save
   * @return {Promise<T>}
   */
  save(data: T):Promise<T> {
    return this.repository.save(data)
  }
  /**
   * 儲存多筆 Entity<T> 的資料
   * @param  {T} data - Multiple data to save
   * @return {Promise<T>}
   */
  saveMany(data: T[]):Promise<T[]> {
    return this.repository.save(data)
  }
}
