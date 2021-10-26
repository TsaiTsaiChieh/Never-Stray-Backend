"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petStatusConvert = exports.ternaryConvert = exports.ageConvert = exports.sexConvert = void 0;
var Pet_1 = require("../entity/Pet");
/** Sex string converter
 * @param  {string} sex sex string
 * @return {Sex} sex enum value
 */
function sexConvert(sex) {
    switch (sex) {
        case Pet_1.Sex.MALE:
        case '公':
        case '男':
            return Pet_1.Sex.MALE;
        case Pet_1.Sex.FEMALE:
        case '母':
        case '女':
            return Pet_1.Sex.FEMALE;
        default:
            return Pet_1.Sex.UNKNOWN;
    }
}
exports.sexConvert = sexConvert;
/** Age string converter
 * @param  {string} age age string to lower case
 * @return {Age} age enum value
 */
function ageConvert(age) {
    switch (age.toLowerCase()) {
        case 'adult':
            return Pet_1.Age.ADULT;
        case 'child':
            return Pet_1.Age.CHILD;
        default:
            return Pet_1.Age.UNKNOWN;
    }
}
exports.ageConvert = ageConvert;
/** Ternary string converter
 * @param  {string} value ternary string
 * @return {Ternary} ternary enum value
 */
function ternaryConvert(value) {
    switch (value) {
        case Pet_1.Ternary.FALSE:
            return Pet_1.Ternary.FALSE;
        case Pet_1.Ternary.TRUE:
            return Pet_1.Ternary.TRUE;
        default:
            return Pet_1.Ternary.UNKNOWN;
    }
}
exports.ternaryConvert = ternaryConvert;
/** Pet status converter
 * @param  {string} status status string
 * @return {Status} status enum value
 */
function petStatusConvert(status) {
    switch (status.toLowerCase()) {
        case Pet_1.Status.ADOPTED.toLowerCase():
            return Pet_1.Status.ADOPTED;
        case Pet_1.Status.OPEN.toLowerCase():
            return Pet_1.Status.OPEN;
        case Pet_1.Status.DEAD.toLowerCase():
            return Pet_1.Status.DEAD;
        case Pet_1.Status.OTHER.toLowerCase():
            return Pet_1.Status.OTHER;
        default:
            return Pet_1.Status.UNKNOWN;
    }
}
exports.petStatusConvert = petStatusConvert;
