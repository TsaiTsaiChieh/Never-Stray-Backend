"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = exports.Status = exports.Ternary = exports.Age = exports.Sex = exports.Ref = void 0;
/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
var typeorm_1 = require("typeorm");
var Ref;
(function (Ref) {
    Ref["GOV"] = "gov";
    Ref["MAP"] = "map";
    Ref["OWN"] = "own";
})(Ref = exports.Ref || (exports.Ref = {}));
var Sex;
(function (Sex) {
    Sex["FEMALE"] = "F";
    Sex["MALE"] = "M";
    Sex["UNKNOWN"] = "U";
})(Sex = exports.Sex || (exports.Sex = {}));
var Age;
(function (Age) {
    Age["ADULT"] = "Adult";
    Age["CHILD"] = "Child";
    Age["UNKNOWN"] = "Unknown";
})(Age = exports.Age || (exports.Age = {}));
var Ternary;
(function (Ternary) {
    Ternary["TRUE"] = "True";
    Ternary["FALSE"] = "False";
    Ternary["UNKNOWN"] = "Unknown";
})(Ternary = exports.Ternary || (exports.Ternary = {}));
var Status;
(function (Status) {
    Status["UNKNOWN"] = "Unknown";
    Status["OPEN"] = "Open";
    Status["ADOPTED"] = "Adopted";
    Status["OTHER"] = "Other";
    Status["DEAD"] = "Dead";
})(Status = exports.Status || (exports.Status = {}));
var Pet = /** @class */ (function () {
    function Pet() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Pet.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Ref, nullable: false })
    ], Pet.prototype, "ref", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinyint', nullable: false })
    ], Pet.prototype, "area_id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinytext', nullable: false })
    ], Pet.prototype, "kind", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Sex, default: Sex.UNKNOWN })
    ], Pet.prototype, "sex", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinytext' })
    ], Pet.prototype, "color", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Age, default: Age.UNKNOWN })
    ], Pet.prototype, "age", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Ternary, default: Ternary.UNKNOWN })
    ], Pet.prototype, "ligation", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Ternary, default: Ternary.UNKNOWN })
    ], Pet.prototype, "rabies", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinytext' })
    ], Pet.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Status, default: Status.UNKNOWN })
    ], Pet.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinytext', nullable: true })
    ], Pet.prototype, "remark", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinytext', nullable: true })
    ], Pet.prototype, "address", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinytext', nullable: true })
    ], Pet.prototype, "phone", void 0);
    __decorate([
        typeorm_1.Column({ type: 'json', nullable: true })
    ], Pet.prototype, "image", void 0);
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Pet.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Pet.prototype, "updated_at", void 0);
    Pet = __decorate([
        typeorm_1.Entity({ name: 'pets' })
    ], Pet);
    return Pet;
}());
exports.Pet = Pet;
