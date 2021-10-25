"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShelterData = exports.Shelter = void 0;
/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
var axios_1 = __importDefault(require("axios"));
var chalk_1 = __importDefault(require("chalk"));
var dotenv_1 = __importDefault(require("dotenv"));
var lodash_1 = __importDefault(require("lodash"));
var safe_await_1 = __importDefault(require("safe-await"));
var app_error_1 = require("../utils/app-error");
var value_convert_1 = require("../utils/value-convert");
dotenv_1.default.config();
// type PetData
var Shelter = /** @class */ (function () {
    /**
     * @param  {Connection} db
     */
    function Shelter(db) {
        this.url = process.env.NATIONAL_ANIMAL_SHELTER;
        this.batch = 1;
        this.db = db;
    }
    /** get data
     * @return {Promise<ShelterData[]>} all pet data
     */
    Shelter.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allData, page, _a, error, response, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        allData = [];
                        page = 0;
                        _b.label = 1;
                    case 1:
                        if (!(page < 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, safe_await_1.default(axios_1.default.get(this.url + "\n        &$top=" + this.batch + "\n        &$skip=68\n        &animal_status=OPEN"))
                            // &$skip=${this.batch * page}
                        ];
                    case 2:
                        _a = _b.sent(), error = _a[0], response = _a[1];
                        // &$skip=${this.batch * page}
                        if (error)
                            throw new app_error_1.AppError(chalk_1.default.red(error));
                        data = response.data;
                        if (!data.length)
                            return [3 /*break*/, 4];
                        lodash_1.default.forEach(data, function (val) { return allData.push(val); });
                        _b.label = 3;
                    case 3:
                        page++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, allData];
                }
            });
        });
    };
    Shelter.prototype.saveData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var PetData;
            return __generator(this, function (_a) {
                PetData = [];
                lodash_1.default.forEach(data, function (val) { return PetData.push({
                    ref: 'gov',
                    area_id: val.animal_area_pkid,
                    kind: val.animal_kind,
                    sex: value_convert_1.sexConvert(val.animal_sex),
                    color: val.animal_colour,
                    age: value_convert_1.ageConvert(val.animal_age),
                    ligation: value_convert_1.ternaryConvert(val.animal_sterilization),
                }); });
                console.log(PetData);
                return [2 /*return*/];
            });
        });
    };
    return Shelter;
}());
exports.Shelter = Shelter;
// async function getShelterData(db: Connection) {
//   // const findArea = await db.getRepository(Area).findOne()
//   // console.log(findArea)
//   const url: string = process.env.NATIONAL_ANIMAL_SHELTER!
//   // const data = await axios.get(`${url}`)
//   console.log(url)
// }
function getShelterData(db) {
    return __awaiter(this, void 0, void 0, function () {
        var shelter, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shelter = new Shelter(db);
                    return [4 /*yield*/, shelter.getData()];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, shelter.saveData(data)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getShelterData = getShelterData;
// export async function getShelterData() {
//   const shelter = new Shelter()
//   const data = await shelter.getData()
//   console.log(data.length)
// }
