"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBError = exports.AppError = void 0;
/* eslint-disable require-jsdoc */
var http_status_1 = __importDefault(require("http-status"));
var chalk_logger_1 = require("./chalk-logger");
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(message, details, isOperational, code) {
        if (isOperational === void 0) { isOperational = true; }
        if (code === void 0) { code = http_status_1.default.INTERNAL_SERVER_ERROR; }
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.details = details;
        _this.code = code;
        _this.isOperational = isOperational;
        _this.status = "".concat(code).startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(_this, _this.constructor);
        (0, chalk_logger_1.redLog)(message);
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
/* === 500 INTERNAL SERVER ERROR === */
var DBError = /** @class */ (function (_super) {
    __extends(DBError, _super);
    function DBError(message, details, isOperational, code) {
        if (message === void 0) { message = 'MySQL 錯誤'; }
        if (isOperational === void 0) { isOperational = true; }
        if (code === void 0) { code = http_status_1.default.INTERNAL_SERVER_ERROR; }
        return _super.call(this, message, details, isOperational, code) || this;
    }
    return DBError;
}(AppError));
exports.DBError = DBError;
