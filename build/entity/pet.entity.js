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
exports.Pet = exports.Kind = exports.Status = exports.Ternary = exports.Age = exports.Sex = exports.Ref = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
var typeorm_1 = require("typeorm");
var area_entity_1 = require("./area.entity");
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
    Age["ADULT"] = "A";
    Age["CHILD"] = "C";
    Age["UNKNOWN"] = "U";
})(Age = exports.Age || (exports.Age = {}));
var Ternary;
(function (Ternary) {
    Ternary["TRUE"] = "T";
    Ternary["FALSE"] = "F";
    Ternary["UNKNOWN"] = "U";
})(Ternary = exports.Ternary || (exports.Ternary = {}));
var Status;
(function (Status) {
    Status["UNKNOWN"] = "Unknown";
    Status["OPEN"] = "Open";
    Status["ADOPTED"] = "Adopted";
    Status["OTHER"] = "Other";
    Status["DEAD"] = "Dead";
})(Status = exports.Status || (exports.Status = {}));
var Kind;
(function (Kind) {
    Kind["DOG"] = "D";
    Kind["CAT"] = "C";
    Kind["OTHER"] = "O";
})(Kind = exports.Kind || (exports.Kind = {}));
var Pet = /** @class */ (function () {
    /** Class representing a pet */
    function Pet() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Pet.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'int', nullable: false }),
        __metadata("design:type", Number)
    ], Pet.prototype, "sub_id", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 32,
            nullable: true,
            comment: '政府收容編號',
        }),
        __metadata("design:type", String)
    ], Pet.prototype, "accept_num", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Ref, nullable: false }),
        __metadata("design:type", String)
    ], Pet.prototype, "ref", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: area_entity_1.City, nullable: false, name: 'city_id' }),
        __metadata("design:type", String)
    ], Pet.prototype, "city_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return area_entity_1.Area; }),
        typeorm_1.JoinColumn({ name: 'city_id', referencedColumnName: 'city' }),
        __metadata("design:type", String)
    ], Pet.prototype, "city", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Kind, nullable: false }),
        __metadata("design:type", String)
    ], Pet.prototype, "kind", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Sex, default: Sex.UNKNOWN }),
        __metadata("design:type", String)
    ], Pet.prototype, "sex", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 32, nullable: true }),
        __metadata("design:type", String)
    ], Pet.prototype, "color", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Age, default: Age.UNKNOWN }),
        __metadata("design:type", String)
    ], Pet.prototype, "age", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: Ternary,
            default: Ternary.UNKNOWN,
            comment: '是否絕育',
        }),
        __metadata("design:type", String)
    ], Pet.prototype, "ligation", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: Ternary,
            default: Ternary.UNKNOWN,
            comment: '是否施打狂犬病疫苗',
        }),
        __metadata("design:type", String)
    ], Pet.prototype, "rabies", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Pet.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: Status, default: Status.UNKNOWN }),
        __metadata("design:type", String)
    ], Pet.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Pet.prototype, "remark", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 16, nullable: true }),
        __metadata("design:type", String)
    ], Pet.prototype, "phone", void 0);
    __decorate([
        typeorm_1.Column({ type: 'json', nullable: true }),
        __metadata("design:type", Object)
    ], Pet.prototype, "image", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Pet.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Pet.prototype, "updated_at", void 0);
    Pet = __decorate([
        typeorm_1.Entity({ name: 'pets' }),
        typeorm_1.Index(['sub_id', 'accept_num'], { unique: true }),
        typeorm_1.Index(['status', 'accept_num']),
        typeorm_1.Index([
            'status',
            'city_id',
            'color',
            'kind',
            'age',
            'sex',
            'ref',
            'created_at',
            'updated_at',
        ])
        /** Class representing a pet */
    ], Pet);
    return Pet;
}());
exports.Pet = Pet;
