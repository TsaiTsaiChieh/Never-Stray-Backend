"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redLog = exports.greenLog = exports.yellowLog = void 0;
var chalk_1 = __importDefault(require("chalk"));
/**
 * Yellow log
 *
 * @param  {any} msg message which could print out
 */
function yellowLog(msg) {
    console.log(chalk_1.default.yellow(msg));
}
exports.yellowLog = yellowLog;
/**
 * Green log
 *
 * @param  {any} msg message which could print out
 */
function greenLog(msg) {
    console.log(chalk_1.default.green(msg));
}
exports.greenLog = greenLog;
/**
 * Red log
 *
 * @param  {any} msg message which could print out
 */
function redLog(msg) {
    console.log(chalk_1.default.red(msg));
}
exports.redLog = redLog;
