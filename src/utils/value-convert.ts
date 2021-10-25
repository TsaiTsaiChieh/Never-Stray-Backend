import {Age, Sex, Ternary} from '../entity/Pet'


/** Sex string converter
 * @param  {string} sexValue sex string
 * @return {Sex} sex enum value
 */
export function sexConvert(sexValue: string): Sex {
  switch (sexValue) {
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
 * @param  {string} ageValue age string to lower case
 * @return {Age} age enum value
 */
export function ageConvert(ageValue: string): Age {
  switch (ageValue.toLowerCase()) {
    case 'adult':
      return Age.ADULT
    case 'child':
      return Age.CHILD
    default:
      return Age.UNKNOWN
  }
}
/** Ternary string converter
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
