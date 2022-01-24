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
var axios_1 = __importDefault(require("axios"));
var safe_await_1 = __importDefault(require("safe-await"));
var typeorm_1 = require("typeorm");
var pet_entity_1 = require("../entity/pet.entity");
var pet_repository_1 = require("../repositories/pet.repository");
var app_error_1 = require("../utils/app-error");
var chalk_logger_1 = require("../utils/chalk-logger");
var helper_1 = require("../utils/helper");
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
                        chalk_logger_1.yellowLog("--- Page: " + page + " ---");
                        return [4 /*yield*/, safe_await_1.default(axios_1.default.get(this.url + "&$top=" + this.batch + "&$skip=" + this.batch * page + "&animal_status=OPEN"))];
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
                        chalk_logger_1.greenLog("=== Get " + allData.length + " data ===");
                        return [2 /*return*/, allData];
                }
            });
        });
    };
    /**
     * 更新動物的狀態
     *
     * 搜尋狀態為待認領的動物資料，若未在狀態為待認領的 API 裡，則狀態改為未知，
     * 反之，更新資料，移除 API 裡該筆動物資料的 ID 後回傳
     *
     * @param  {ShelterData[]} data From API
     * @return {number[]} left_ids data IDs after filter out
     */
    Shelter.prototype.updatePetStatus = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, left_ids, _a, error, result, _i, result_1, ele, in_data_index, _b, error_1, _1, _c, error_2, _2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        ids = data.map(function (val) { return val.animal_id; });
                        left_ids = helper_1.deepCopy(ids);
                        chalk_logger_1.yellowLog(ids);
                        return [4 /*yield*/, safe_await_1.default(this.petRepository.find([
                                {
                                    status: pet_entity_1.Status.OPEN,
                                    accept_num: typeorm_1.Not(typeorm_1.IsNull()),
                                },
                                {
                                    status: pet_entity_1.Status.UNKNOWN,
                                    accept_num: typeorm_1.Not(typeorm_1.IsNull()),
                                },
                            ]))];
                    case 1:
                        _a = _d.sent(), error = _a[0], result = _a[1];
                        if (error)
                            throw new app_error_1.AppError(error);
                        _i = 0, result_1 = result;
                        _d.label = 2;
                    case 2:
                        if (!(_i < result_1.length)) return [3 /*break*/, 7];
                        ele = result_1[_i];
                        in_data_index = ids.indexOf(Number(ele.sub_id));
                        if (!(in_data_index < 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, safe_await_1.default(this.petRepository.update({
                                id: ele.id,
                            }, {
                                status: pet_entity_1.Status.UNKNOWN,
                            }))];
                    case 3:
                        _b = _d.sent(), error_1 = _b[0], _1 = _b[1];
                        if (error_1)
                            throw new app_error_1.AppError(error_1);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, safe_await_1.default(this.petRepository.update({
                            sub_id: ele.sub_id,
                            accept_num: ele.accept_num,
                        }, {
                            ref: 'gov',
                            city_id: value_convert_1.cityConvert(data[in_data_index].animal_area_pkid),
                            kind: value_convert_1.petKindConvert(data[in_data_index].animal_kind),
                            sex: value_convert_1.sexConvert(data[in_data_index].animal_sex),
                            color: value_convert_1.petColorConvert(data[in_data_index].animal_colour),
                            age: value_convert_1.ageConvert(data[in_data_index].animal_age),
                            ligation: value_convert_1.ternaryConvert(data[in_data_index].animal_sterilization),
                            rabies: value_convert_1.ternaryConvert(data[in_data_index].animal_bacterin),
                            title: data[in_data_index].animal_place,
                            status: value_convert_1.petStatusConvert(data[in_data_index].animal_status),
                            remark: data[in_data_index].animal_remark,
                            phone: data[in_data_index].shelter_tel,
                            image: [data[in_data_index].album_file],
                            created_at: data[in_data_index].animal_createtime ?
                                new Date(data[in_data_index].animal_createtime) :
                                new Date(),
                        }))];
                    case 5:
                        _c = _d.sent(), error_2 = _c[0], _2 = _c[1];
                        if (error_2)
                            throw new app_error_1.AppError(error_2);
                        chalk_logger_1.greenLog("=== Update [" + ele.sub_id + ", " + ele.accept_num + "] data ===");
                        // Filter out the ID which already been updated
                        left_ids.splice(in_data_index, 1);
                        _d.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7:
                        chalk_logger_1.greenLog("=== " + left_ids.length + " data should be stored ===");
                        return [2 /*return*/, left_ids];
                }
            });
        });
    };
    /**
     * 儲存寵物的資訊
     *
     * @param  {ShelterData[]} data From axios
     * @param  {number[]} ids IDs which already been updated after filter out
     */
    Shelter.prototype.saveData = function (data, ids) {
        return __awaiter(this, void 0, void 0, function () {
            var petData, _a, error, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        petData = [];
                        data = data.filter(function (val) { return ids.includes(val.animal_id); });
                        data.forEach(function (ele) {
                            return petData.push({
                                ref: 'gov',
                                sub_id: ele.animal_id,
                                accept_num: ele.animal_subid,
                                city_id: value_convert_1.cityConvert(ele.animal_area_pkid),
                                kind: value_convert_1.petKindConvert(ele.animal_kind),
                                sex: value_convert_1.sexConvert(ele.animal_sex),
                                color: value_convert_1.petColorConvert(ele.animal_colour),
                                age: value_convert_1.ageConvert(ele.animal_age),
                                ligation: value_convert_1.ternaryConvert(ele.animal_sterilization),
                                rabies: value_convert_1.ternaryConvert(ele.animal_bacterin),
                                title: ele.animal_place,
                                status: value_convert_1.petStatusConvert(ele.animal_status),
                                remark: ele.animal_remark,
                                phone: ele.shelter_tel,
                                image: [ele.album_file],
                                created_at: ele.animal_createtime ?
                                    new Date(ele.animal_createtime) :
                                    new Date(),
                            });
                        });
                        return [4 /*yield*/, safe_await_1.default(this.petRepository.saveMany(petData))];
                    case 1:
                        _a = _b.sent(), error = _a[0], result = _a[1];
                        if (error)
                            throw new app_error_1.AppError(error);
                        if (result)
                            chalk_logger_1.greenLog("=== Saved " + result.length + " data ===");
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
        var shelter, data, ids;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shelter = new Shelter();
                    return [4 /*yield*/, shelter.getData()];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, shelter.updatePetStatus(data)];
                case 2:
                    ids = _a.sent();
                    return [4 /*yield*/, shelter.saveData(data, ids)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getShelterData = getShelterData;
