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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaRepository = void 0;
var Area_1 = require("../entity/Area");
var basic_repository_1 = require("../utils/basic-repository");
/** Class representing an area repository */
var AreaRepository = /** @class */ (function (_super) {
    __extends(AreaRepository, _super);
    /** Create an area */
    function AreaRepository() {
        return _super.call(this, Area_1.Area) || this;
    }
    return AreaRepository;
}(basic_repository_1.BasicRepository));
exports.AreaRepository = AreaRepository;
