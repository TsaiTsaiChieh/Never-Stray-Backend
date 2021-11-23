"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionConvert = exports.cityConvert = exports.petKindConvert = exports.petStatusConvert = exports.ternaryConvert = exports.ageConvert = exports.sexConvert = void 0;
var Area_1 = require("../entity/Area");
var Pet_1 = require("../entity/Pet");
/** Sex string converter
 *
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
 *
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
 *
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
/** The status of pet status converter
 *
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
/** The kind of pet converter
 *
 * @param  {string} kind kind string
 * @return {Kind} kind enum value
 */
function petKindConvert(kind) {
    switch (kind) {
        case '狗':
            return Pet_1.Kind.DOG;
        case '貓':
            return Pet_1.Kind.CAT;
        default:
            return Pet_1.Kind.OTHER;
    }
}
exports.petKindConvert = petKindConvert;
/** The city of area converter
 *
 * @param  {string} city city string
 * @return {City} city enum value
 */
function cityConvert(city) {
    switch (city) {
        case 2:
            return Area_1.City.TPE;
        case 3:
            return Area_1.City.TPH;
        case 4:
            return Area_1.City.KLU;
        case 5:
            return Area_1.City.ILN;
        case 6:
            return Area_1.City.TYC;
        case 7:
            return Area_1.City.HSH;
        case 8:
            return Area_1.City.HSC;
        case 9:
            return Area_1.City.MAL;
        case 10:
            return Area_1.City.TXG;
        case 11:
            return Area_1.City.CWH;
        case 12:
            return Area_1.City.NTO;
        case 13:
            return Area_1.City.YLH;
        case 14:
            return Area_1.City.CHY;
        case 15:
            return Area_1.City.CYI;
        case 16:
            return Area_1.City.TNN;
        case 17:
            return Area_1.City.KHH;
        case 18:
            return Area_1.City.IUH;
        case 19:
            return Area_1.City.HWA;
        case 20:
            return Area_1.City.TTT;
        case 21:
            return Area_1.City.PEH;
        case 22:
            return Area_1.City.KMN;
        case 23:
            return Area_1.City.LNN;
        default:
            return Area_1.City.TPE;
    }
}
exports.cityConvert = cityConvert;
/** The region of area converter
 *
 * @param  {string} region region string
 * @return {Region} region enum value
 */
function regionConvert(region) {
    switch (region) {
        case Area_1.Region.EAST:
            return Area_1.Region.EAST;
        case Area_1.Region.WEST:
            return Area_1.Region.WEST;
        case Area_1.Region.SOUTH:
            return Area_1.Region.SOUTH;
        case Area_1.Region.NORTH:
            return Area_1.Region.NORTH;
        case Area_1.Region.MIDDLE:
            return Area_1.Region.MIDDLE;
        default:
            return Area_1.Region.NORTH;
    }
}
exports.regionConvert = regionConvert;
