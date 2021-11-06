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
exports.PetRepository = void 0;
var Pet_1 = require("../entity/Pet");
var basic_repository_1 = require("../utils/basic-repository");
/** Class representing a pet repository  */
var PetRepository = /** @class */ (function (_super) {
    __extends(PetRepository, _super);
    /** Create a pet */
    function PetRepository() {
        return _super.call(this, Pet_1.Pet) || this;
    }
    return PetRepository;
}(basic_repository_1.BasicRepository));
exports.PetRepository = PetRepository;
