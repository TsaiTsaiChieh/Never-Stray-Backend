"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ternaryConvert = exports.ageConvert = exports.sexConvert = void 0;
var Pet_1 = require("../entity/Pet");
/** Sex string converter
 * @param  {string} sexValue sex string
 * @return {Sex} sex enum value
 */
function sexConvert(sexValue) {
    switch (sexValue) {
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
 * @param  {string} ageValue age string to lower case
 * @return {Age} age enum value
 */
function ageConvert(ageValue) {
    switch (ageValue.toLowerCase()) {
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
