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
exports.AppError = void 0;
var chalk_1 = __importDefault(require("chalk"));
var http_status_1 = __importDefault(require("http-status"));
/**
 * Custom error
 * @extends Error
 * @class AppError
 */
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    /**
       * Creates an instance of AppError.
       * @param {string} message error message
       * @param {HttpStatus} statusCode http status code, default is
       * INTERNAL_SERVER_ERROR (500)
       */
    function AppError(message, statusCode) {
        if (statusCode === void 0) { statusCode = http_status_1.default.INTERNAL_SERVER_ERROR; }
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.status = ("" + statusCode).startsWith('4') ? 'fail' : 'error';
        _this.isOperational = true;
        Error.captureStackTrace(_this, _this.constructor);
        console.error(chalk_1.default.red(message));
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
