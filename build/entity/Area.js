"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area = exports.City = exports.Region = void 0;
/* eslint-disable require-jsdoc */
var typeorm_1 = require("typeorm");
var Region;
(function (Region) {
    Region["EAST"] = "E";
    Region["WEST"] = "W";
    Region["SOUTH"] = "S";
    Region["NORTH"] = "N";
    Region["MIDDLE"] = "M";
})(Region = exports.Region || (exports.Region = {}));
var City;
(function (City) {
    City[City["TPE"] = 2] = "TPE";
    City[City["TPH"] = 3] = "TPH";
    City[City["KLU"] = 4] = "KLU";
    City[City["ILN"] = 5] = "ILN";
    City[City["TYC"] = 6] = "TYC";
    City[City["HSH"] = 7] = "HSH";
    City[City["HSC"] = 8] = "HSC";
    City[City["MAL"] = 9] = "MAL";
    City[City["TXG"] = 10] = "TXG";
    City[City["CWH"] = 11] = "CWH";
    City[City["NTO"] = 12] = "NTO";
    City[City["YLH"] = 13] = "YLH";
    City[City["CHY"] = 14] = "CHY";
    City[City["CYI"] = 15] = "CYI";
    City[City["TNN"] = 16] = "TNN";
    City[City["KHH"] = 17] = "KHH";
    City[City["IUH"] = 18] = "IUH";
    City[City["HWA"] = 19] = "HWA";
    City[City["TTT"] = 20] = "TTT";
    City[City["PEH"] = 21] = "PEH";
    City[City["KMN"] = 22] = "KMN";
    City[City["LNN"] = 23] = "LNN"; // 連江縣
})(City = exports.City || (exports.City = {}));
var Area = /** @class */ (function () {
    function Area() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Area.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Region, nullable: false })
    ], Area.prototype, "area", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: City, nullable: false })
    ], Area.prototype, "city", void 0);
    Area = __decorate([
        typeorm_1.Entity({ name: 'areas' })
    ], Area);
    return Area;
}());
exports.Area = Area;
