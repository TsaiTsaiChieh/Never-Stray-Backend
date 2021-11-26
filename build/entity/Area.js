"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area = exports.City = exports.Region = void 0;
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
    City["TPE"] = "2";
    City["TPH"] = "3";
    City["KLU"] = "4";
    City["ILN"] = "5";
    City["TYC"] = "6";
    City["HSH"] = "7";
    City["HSC"] = "8";
    City["MAL"] = "9";
    City["TXG"] = "10";
    City["CWH"] = "11";
    City["NTO"] = "12";
    City["YLH"] = "13";
    City["CHY"] = "14";
    City["CYI"] = "15";
    City["TNN"] = "16";
    City["KHH"] = "17";
    City["IUH"] = "18";
    City["HWA"] = "19";
    City["TTT"] = "20";
    City["PEH"] = "21";
    City["KMN"] = "22";
    City["LNN"] = "23"; // 連江縣
})(City = exports.City || (exports.City = {}));
var Area = /** @class */ (function () {
    /** Class representing the Area */
    function Area() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Area.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', enum: Region, nullable: false }),
        __metadata("design:type", String)
    ], Area.prototype, "region", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', enum: City, nullable: false }),
        __metadata("design:type", String)
    ], Area.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 4 }),
        __metadata("design:type", String)
    ], Area.prototype, "name", void 0);
    Area = __decorate([
        (0, typeorm_1.Entity)({ name: 'areas' }),
        (0, typeorm_1.Index)(['city']),
        (0, typeorm_1.Index)(['region', 'city'], { unique: true })
        /** Class representing the Area */
    ], Area);
    return Area;
}());
exports.Area = Area;
