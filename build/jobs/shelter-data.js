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
var axios_1 = __importDefault(require("axios"));
var safe_await_1 = __importDefault(require("safe-await"));
var pet_entity_1 = require("../entity/pet.entity");
var pet_repository_1 = require("../repositories/pet.repository");
var app_error_1 = require("../utils/app-error");
var chalk_logger_1 = require("../utils/chalk-logger");
var value_convert_1 = require("../utils/value-convert");
/** Class representing a pet repository  */
var Shelter = /** @class */ (function () {
    /** Create a shelter */
    function Shelter() {
        this.url = process.env.NATIONAL_ANIMAL_SHELTER;
        this.batch = 100;
        this.petRepository = new pet_repository_1.PetRepository();
    }
    /**
     * 更新屬於政府收容所且狀態未知的寵物資訊
     *
     */
    Shelter.prototype.updateUnknownStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error, result, unknownCount, _i, result_1, ele, _b, error_1, response, data, _c, error_2, _1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, (0, safe_await_1.default)(this.petRepository.findByFilters({ status: pet_entity_1.Status.UNKNOWN, ref: pet_entity_1.Ref.GOV }))];
                    case 1:
                        _a = _d.sent(), error = _a[0], result = _a[1];
                        unknownCount = result ? result.length : 0;
                        (0, chalk_logger_1.yellowLog)("There are ".concat(unknownCount, " data, which status is unknown"));
                        if (error)
                            throw new app_error_1.AppError(error);
                        _i = 0, result_1 = result;
                        _d.label = 2;
                    case 2:
                        if (!(_i < result_1.length)) return [3 /*break*/, 6];
                        ele = result_1[_i];
                        return [4 /*yield*/, (0, safe_await_1.default)(axios_1.default.get("".concat(this.url, "&animal_id=").concat(ele.sub_id)))];
                    case 3:
                        _b = _d.sent(), error_1 = _b[0], response = _b[1];
                        if (error_1)
                            throw new app_error_1.AppError(error_1);
                        data = response.data;
                        if (!data.length) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, safe_await_1.default)(this.petRepository.update({
                                sub_id: ele.sub_id,
                                accept_num: ele.accept_num,
                            }, {
                                city_id: (0, value_convert_1.cityConvert)(data[0].animal_area_pkid),
                                kind: (0, value_convert_1.petKindConvert)(data[0].animal_kind),
                                sex: (0, value_convert_1.sexConvert)(data[0].animal_sex),
                                color: (0, value_convert_1.petColorConvert)(data[0].animal_colour),
                                age: (0, value_convert_1.ageConvert)(data[0].animal_age),
                                ligation: (0, value_convert_1.ternaryConvert)(data[0].animal_sterilization),
                                rabies: (0, value_convert_1.ternaryConvert)(data[0].animal_bacterin),
                                title: data[0].animal_place,
                                status: (0, value_convert_1.petStatusConvert)(data[0].animal_status),
                                remark: data[0].animal_remark,
                                phone: data[0].shelter_tel,
                                image: [data[0].album_file],
                                created_at: data[0].animal_createtime ?
                                    new Date(data[0].animal_createtime) :
                                    new Date(),
                            }))];
                    case 4:
                        _c = _d.sent(), error_2 = _c[0], _1 = _c[1];
                        if (error_2)
                            throw new app_error_1.AppError(error_2);
                        unknownCount -= 1;
                        (0, chalk_logger_1.yellowLog)("=== Update [".concat(ele.sub_id, ", ").concat(ele.accept_num, "] \n          which status is unknown ==="));
                        _d.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6:
                        (0, chalk_logger_1.yellowLog)("There are still ".concat(unknownCount, " unknown status"));
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 取得狀態為待認養的動物資料
     *
     * @return {Promise<ShelterData[]>}
     */
    Shelter.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allData, loopFlag, page, _a, error, response, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        allData = [];
                        loopFlag = true;
                        page = 0;
                        _b.label = 1;
                    case 1:
                        if (!loopFlag) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, safe_await_1.default)(axios_1.default.get("".concat(this.url, "&$top=").concat(this.batch, "&$skip=").concat(this.batch * page, "&animal_status=OPEN")))];
                    case 2:
                        _a = _b.sent(), error = _a[0], response = _a[1];
                        if (error)
                            throw new app_error_1.AppError(error);
                        data = response.data;
                        if (data.length === 0)
                            loopFlag = false;
                        data.forEach(function (ele) {
                            // Because shelters need the values of
                            // animal_id and animal_subid to be linked
                            if (ele.animal_id && ele.animal_subid) {
                                allData.push(ele);
                            }
                        });
                        _b.label = 3;
                    case 3:
                        page++;
                        return [3 /*break*/, 1];
                    case 4:
                        (0, chalk_logger_1.greenLog)("=== Get ".concat(allData.length, " data ==="));
                        return [2 /*return*/, allData];
                }
            });
        });
    };
    /**
     * 更新動物的資料
     *
     * 搜尋屬於政府收容所的寵物資料，若未在狀態為待認領的 API 裡，則狀態改為未知，
     * 反之，更新資料，並回傳需要新增的資料
     *
     * @param  {ShelterData[]} data From API
     * @return {ShelterData[]} data Data which should be saved
     */
    Shelter.prototype.updatePetInfo = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, updatedIds, _a, error, result, _i, result_2, ele, indexOfData, _b, error_3, _2, _c, error_4, _3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        ids = data.map(function (val) { return val.animal_id; });
                        updatedIds = [];
                        return [4 /*yield*/, (0, safe_await_1.default)(this.petRepository.findByFilters({ status: pet_entity_1.Status.OPEN, ref: pet_entity_1.Ref.GOV }))];
                    case 1:
                        _a = _d.sent(), error = _a[0], result = _a[1];
                        if (error)
                            throw new app_error_1.AppError(error);
                        _i = 0, result_2 = result;
                        _d.label = 2;
                    case 2:
                        if (!(_i < result_2.length)) return [3 /*break*/, 7];
                        ele = result_2[_i];
                        indexOfData = ids.indexOf(Number(ele.sub_id));
                        if (!(indexOfData < 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, safe_await_1.default)(this.petRepository.update({
                                id: ele.id,
                            }, {
                                status: pet_entity_1.Status.UNKNOWN,
                            }))];
                    case 3:
                        _b = _d.sent(), error_3 = _b[0], _2 = _b[1];
                        if (error_3)
                            throw new app_error_1.AppError(error_3);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, (0, safe_await_1.default)(this.petRepository.update({
                            sub_id: ele.sub_id,
                            accept_num: ele.accept_num,
                        }, {
                            city_id: (0, value_convert_1.cityConvert)(data[indexOfData].animal_area_pkid),
                            kind: (0, value_convert_1.petKindConvert)(data[indexOfData].animal_kind),
                            sex: (0, value_convert_1.sexConvert)(data[indexOfData].animal_sex),
                            color: (0, value_convert_1.petColorConvert)(data[indexOfData].animal_colour),
                            age: (0, value_convert_1.ageConvert)(data[indexOfData].animal_age),
                            ligation: (0, value_convert_1.ternaryConvert)(data[indexOfData].animal_sterilization),
                            rabies: (0, value_convert_1.ternaryConvert)(data[indexOfData].animal_bacterin),
                            title: data[indexOfData].animal_place,
                            status: (0, value_convert_1.petStatusConvert)(data[indexOfData].animal_status),
                            remark: data[indexOfData].animal_remark,
                            phone: data[indexOfData].shelter_tel,
                            image: [data[indexOfData].album_file],
                            created_at: data[indexOfData].animal_createtime ?
                                new Date(data[indexOfData].animal_createtime) :
                                new Date(),
                        }))];
                    case 5:
                        _c = _d.sent(), error_4 = _c[0], _3 = _c[1];
                        if (error_4)
                            throw new app_error_1.AppError(error_4);
                        updatedIds.push(ele.sub_id);
                        _d.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7:
                        (0, chalk_logger_1.greenLog)("=== Update ".concat(updatedIds.length, " data"));
                        // Filter out the ID which already been updated
                        data = data.filter(function (val) { return !updatedIds.includes(val.animal_id); });
                        (0, chalk_logger_1.greenLog)("=== ".concat(data.length, " data should be stored ==="));
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 儲存寵物的資訊
     *
     * @param  {ShelterData[]} data Which should be stored
     */
    Shelter.prototype.saveData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var petData, _a, error, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        petData = [];
                        data.forEach(function (ele) {
                            return petData.push({
                                ref: 'gov',
                                sub_id: ele.animal_id,
                                accept_num: ele.animal_subid,
                                city_id: (0, value_convert_1.cityConvert)(ele.animal_area_pkid),
                                kind: (0, value_convert_1.petKindConvert)(ele.animal_kind),
                                sex: (0, value_convert_1.sexConvert)(ele.animal_sex),
                                color: (0, value_convert_1.petColorConvert)(ele.animal_colour),
                                age: (0, value_convert_1.ageConvert)(ele.animal_age),
                                ligation: (0, value_convert_1.ternaryConvert)(ele.animal_sterilization),
                                rabies: (0, value_convert_1.ternaryConvert)(ele.animal_bacterin),
                                title: ele.animal_place,
                                status: (0, value_convert_1.petStatusConvert)(ele.animal_status),
                                remark: ele.animal_remark,
                                phone: ele.shelter_tel,
                                image: [ele.album_file],
                                created_at: ele.animal_createtime ?
                                    new Date(ele.animal_createtime) :
                                    new Date(),
                            });
                        });
                        return [4 /*yield*/, (0, safe_await_1.default)(this.petRepository.saveMany(petData))];
                    case 1:
                        _a = _b.sent(), error = _a[0], result = _a[1];
                        if (error)
                            throw new app_error_1.AppError(error);
                        if (result)
                            (0, chalk_logger_1.greenLog)("=== Saved ".concat(result.length, " data ==="));
                        return [2 /*return*/];
                }
            });
        });
    };
    return Shelter;
}());
exports.Shelter = Shelter;
/** Get shelter data*/
function getShelterData() {
    return __awaiter(this, void 0, void 0, function () {
        var shelter, data, dataShouldBeSaved;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shelter = new Shelter();
                    return [4 /*yield*/, shelter.updateUnknownStatus()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, shelter.getData()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, shelter.updatePetInfo(data)];
                case 3:
                    dataShouldBeSaved = _a.sent();
                    return [4 /*yield*/, shelter.saveData(dataShouldBeSaved)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getShelterData = getShelterData;
