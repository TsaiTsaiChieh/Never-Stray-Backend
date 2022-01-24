"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepCopy = void 0;
/**
 * Deep Copy
 *
 * @param  {any} data data which want to copy deeply
 * @return {any} data after deep copy
 */
function deepCopy(data) {
    return JSON.parse(JSON.stringify(data));
}
exports.deepCopy = deepCopy;
