import {Age, Kind, Sex, Status, Ternary} from '../entity/Pet'

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
