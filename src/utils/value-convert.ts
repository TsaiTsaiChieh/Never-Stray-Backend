import {City, Region} from '../entity/area.entity'
import {Age, Kind, Sex, Status, Ternary} from '../entity/pet.entity'

/** Sex string converter
 *
 * @param  {string} sex sex string
 * @return {Sex} sex enum value
 */
export function sexConvert(sex: string): Sex {
  switch (sex) {
    case Sex.MALE:
    case '公':
    case '男':
      return Sex.MALE
    case Sex.FEMALE:
    case '母':
    case '女':
      return Sex.FEMALE
    default:
      return Sex.UNKNOWN
  }
}

/** Age string converter
 *
 * @param  {string} age age string to lower case
 * @return {Age} age enum value
 */
export function ageConvert(age: string): Age {
  switch (age.toLowerCase()) {
    case 'adult':
      return Age.ADULT
    case 'child':
      return Age.CHILD
    default:
      return Age.UNKNOWN
  }
}

/** Ternary string converter
 *
 * @param  {string} value ternary string
 * @return {Ternary} ternary enum value
 */
export function ternaryConvert(value: string): Ternary {
  switch (value) {
    case Ternary.FALSE:
      return Ternary.FALSE
    case Ternary.TRUE:
      return Ternary.TRUE
    default:
      return Ternary.UNKNOWN
  }
}

/** The status of pet status converter
 *
 * @param  {string} status status string
 * @return {Status} status enum value
 */
export function petStatusConvert(status: string): Status {
  switch (status.toLowerCase()) {
    case Status.ADOPTED.toLowerCase():
      return Status.ADOPTED
    case Status.OPEN.toLowerCase():
      return Status.OPEN
    case Status.DEAD.toLowerCase():
      return Status.DEAD
    case Status.OTHER.toLowerCase():
      return Status.OTHER
    default:
      return Status.UNKNOWN
  }
}

/** The kind of pet converter
 *
 * @param  {string} kind kind string
 * @return {Kind} kind enum value
 */
export function petKindConvert(kind: string): Kind {
  switch (kind) {
    case '狗':
      return Kind.DOG
    case '貓':
      return Kind.CAT
    default:
      return Kind.OTHER
  }
}

/** The city of area converter
 *
 * @param  {string} city city string
 * @return {City} city enum value
 */
export function cityConvert(city: number): City {
  switch (city) {
    case 2:
      return City.TPE
    case 3:
      return City.TPH
    case 4:
      return City.KLU
    case 5:
      return City.ILN
    case 6:
      return City.TYC
    case 7:
      return City.HSH
    case 8:
      return City.HSC
    case 9:
      return City.MAL
    case 10:
      return City.TXG
    case 11:
      return City.CWH
    case 12:
      return City.NTO
    case 13:
      return City.YLH
    case 14:
      return City.CHY
    case 15:
      return City.CYI
    case 16:
      return City.TNN
    case 17:
      return City.KHH
    case 18:
      return City.IUH
    case 19:
      return City.HWA
    case 20:
      return City.TTT
    case 21:
      return City.PEH
    case 22:
      return City.KMN
    case 23:
      return City.LNN
  default:
    return City.TPE
  }
}

/** The region of area converter
 *
 * @param  {string} region region string
 * @return {Region} region enum value
 */
export function regionConvert(region: string): Region {
  switch (region) {
    case Region.EAST:
      return Region.EAST
    case Region.WEST:
      return Region.WEST
    case Region.SOUTH:
      return Region.SOUTH
    case Region.NORTH:
      return Region.NORTH
    case Region.MIDDLE:
      return Region.MIDDLE
    default:
      return Region.NORTH
  }
}

