/* eslint-disable require-jsdoc */
import safeAwait from 'safe-await'
import {SelectQueryBuilder} from 'typeorm'

import {Pet} from '../entity/pet.entity'
import {BasicRepository} from '../utils/basic-repository'

export class PetRepository extends BasicRepository<Pet> {
  constructor() {
    super(Pet)
  }

  async findByFilters(query: PetQuery): Promise<Pet[]> {
    const page: number = query.page ? query.page : 1
    const limit: number = query.limit ? query.limit : 10
    const skip: number = (page-1)*limit

    const queryBuilder: SelectQueryBuilder<Pet> =
    this.repository.createQueryBuilder('pet')
    queryBuilder.where('pet.sex = :sex', {sex: query.sex})
    queryBuilder.skip(skip).take(query.limit)
    const [error, result]: [any, Pet[]] =
    await safeAwait(queryBuilder.getMany())
    if (error) throw error
    console.log(result)

    return result
  }
}
