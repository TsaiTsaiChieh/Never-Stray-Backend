/* eslint-disable require-jsdoc */
import httpStatus from 'http-status'
import safeAwait from 'safe-await'

import {Pet} from '../entity/pet.entity'
import {PetRepository} from '../repositories/pet.repository'
import {AppError} from '../utils/app-error'

export class PetModel {
  private petRepository: PetRepository
  // public appError
  constructor() {
    this.petRepository = new PetRepository()
    // this.appError = new AppError()
  }

  async getAll(query: PetQuery):Promise<any> {
    const [error, result]: [any, Pet[]] =
    await safeAwait(this.petRepository.findByFilters(query))
    if (error) return new AppError(error, httpStatus.INTERNAL_SERVER_ERROR)
    return result
  }
}
