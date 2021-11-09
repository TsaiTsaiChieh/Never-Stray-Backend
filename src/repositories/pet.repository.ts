import {Pet} from '../entity/Pet'
import {BasicRepository} from '../utils/basic-repository'

/** Class representing a pet repository  */
export class PetRepository extends BasicRepository<Pet> {
    /** Create a pet */
    constructor() {
        super(Pet)
    }
}
