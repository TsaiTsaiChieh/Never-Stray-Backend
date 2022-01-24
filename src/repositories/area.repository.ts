import {Area} from '../entity/area.entity'
import {BasicRepository} from '../utils/basic-repository'

/** Class representing an area repository */
export class AreaRepository extends BasicRepository<Area> {
  /** Create an area */
  constructor() {
    super(Area)
  }
}
