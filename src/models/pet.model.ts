/* eslint-disable require-jsdoc */
import safeAwait from 'safe-await'

import {Pet} from '../entity/pet.entity'
import {PetRepository} from '../repositories/pet.repository'
import {DBError} from '../utils/app-error'

export class PetModel {
  private petRepository: PetRepository
  constructor() {
    this.petRepository = new PetRepository()
  }

  async getAll(query: PetQuery): Promise<any> {
    const [error, result]: [any, Pet[]] = await safeAwait(
      this.petRepository.findByFilters(query),
    )
    if (error) return new DBError(error.toString(), error)
    return result
  }
}
