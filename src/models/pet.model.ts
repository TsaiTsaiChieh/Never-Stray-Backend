/* eslint-disable require-jsdoc */
import {PetRepository} from '../repositories/pet.repository'

export class PetModel {
  private petRepository: PetRepository
  constructor() {
    this.petRepository = new PetRepository()
  }

  async getAll(query: PetQuery) {
    return await this.petRepository.findByFilters(query)
  }
}
