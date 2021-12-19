/* eslint-disable require-jsdoc */
import {Area} from '../entity/area.entity'
import safeAwait from 'safe-await'
import {SelectQueryBuilder} from 'typeorm'

import {Pet} from '../entity/pet.entity'
import {BasicRepository} from '../utils/basic-repository'

export class PetRepository extends BasicRepository<Pet> {
  constructor() {
    super(Pet)
  }

  async findByFilters(query: PetQuery): Promise<Pet[]> {
    const offset: number = (query.page! - 1) * query.limit!

    const queryBuilder: SelectQueryBuilder<Pet> = this.repository
      .createQueryBuilder('pet')
      .leftJoin(Area, 'area', 'area.city = pet.city_id')
    if (query.ref) queryBuilder.where('pet.ref = :ref', {ref: query.ref})
    if (query.age) queryBuilder.andWhere('pet.age = :age', {age: query.age})
    if (query.sex) queryBuilder.andWhere('pet.sex = :sex', {sex: query.sex})
    if (query.region) {
      queryBuilder.andWhere('area.region = :region', {region: query.region})
    }
    if (query.order) {
      queryBuilder.orderBy(
        `pet.${query.order}`,
        `${query.ascend ? 'ASC' : 'DESC'}`,
      )
    }
    queryBuilder.offset(offset).limit(query.limit)

    const [error, result]: [any, Pet[]] = await safeAwait(
      queryBuilder.getMany(),
    )
    if (error) throw error
    return result
  }
}
