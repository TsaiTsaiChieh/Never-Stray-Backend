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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePetAndAreaTable1636729732395 = void 0;
var CreatePetAndAreaTable1636729732395 = /** @class */ (function () {
    function CreatePetAndAreaTable1636729732395() {
        this.name = 'CreatePetAndAreaTable1636729732395';
    }
    CreatePetAndAreaTable1636729732395.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE `ns-app`.`areas` (\n                `id` int NOT NULL AUTO_INCREMENT,\n                `region` enum ('E', 'W', 'S', 'N', 'M') NOT NULL,\n                `city` enum (\n                    '2',\n                    '3',\n                    '4',\n                    '5',\n                    '6',\n                    '7',\n                    '8',\n                    '9',\n                    '10',\n                    '11',\n                    '12',\n                    '13',\n                    '14',\n                    '15',\n                    '16',\n                    '17',\n                    '18',\n                    '19',\n                    '20',\n                    '21',\n                    '22',\n                    '23'\n                ) NOT NULL,\n                `name` varchar(4) NOT NULL,\n                UNIQUE INDEX `IDX_e9481f082921789e2cb47a79a5` (`region`, `city`),\n                INDEX `IDX_83604f081c8f39604d33db2e7d` (`city`),\n                PRIMARY KEY (`id`)\n            ) ENGINE = InnoDB\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            CREATE TABLE `ns-app`.`pets` (\n                `id` int NOT NULL AUTO_INCREMENT,\n                `sub_id` int NOT NULL,\n                `accept_num` varchar(32) NULL COMMENT '\u653F\u5E9C\u6536\u5BB9\u7DE8\u865F',\n                `ref` enum ('gov', 'map', 'own') NOT NULL,\n                `city_id` enum (\n                    '2',\n                    '3',\n                    '4',\n                    '5',\n                    '6',\n                    '7',\n                    '8',\n                    '9',\n                    '10',\n                    '11',\n                    '12',\n                    '13',\n                    '14',\n                    '15',\n                    '16',\n                    '17',\n                    '18',\n                    '19',\n                    '20',\n                    '21',\n                    '22',\n                    '23'\n                ) NOT NULL,\n                `kind` enum ('D', 'C', 'O') NOT NULL,\n                `sex` enum ('F', 'M', 'U') NOT NULL DEFAULT 'U',\n                `color` varchar(32) NULL,\n                `age` enum ('A', 'C', 'U') NOT NULL DEFAULT 'U',\n                `ligation` enum ('T', 'F', 'U') NOT NULL COMMENT '\u662F\u5426\u7D55\u80B2' DEFAULT 'U',\n                `rabies` enum ('T', 'F', 'U') NOT NULL COMMENT '\u662F\u5426\u65BD\u6253\u72C2\u72AC\u75C5\u75AB\u82D7' DEFAULT 'U',\n                `title` varchar(255) NULL,\n                `status` enum ('Unknown', 'Open', 'Adopted', 'Other', 'Dead') NOT NULL DEFAULT 'Unknown',\n                `remark` text NULL,\n                `address` varchar(255) NULL,\n                `phone` varchar(16) NULL,\n                `image` json NULL,\n                `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),\n                `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),\n                INDEX `IDX_6e94e5943dfbc8b2bb9ff0de55` (`status`, `accept_num`),\n                UNIQUE INDEX `IDX_e87fb3dcb389be107725e1f1bf` (`sub_id`, `accept_num`),\n                PRIMARY KEY (`id`)\n            ) ENGINE = InnoDB\n        ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE `ns-app`.`pets`\n            ADD CONSTRAINT `FK_859edd5c48585a95bd7c7d4e4c9` FOREIGN KEY (`city_id`) REFERENCES `ns-app`.`areas`(`city`) ON DELETE NO ACTION ON UPDATE NO ACTION\n        ")];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreatePetAndAreaTable1636729732395.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("\n            ALTER TABLE `ns-app`.`pets` DROP FOREIGN KEY `FK_859edd5c48585a95bd7c7d4e4c9`\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP INDEX `IDX_e87fb3dcb389be107725e1f1bf` ON `ns-app`.`pets`\n        ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP INDEX `IDX_6e94e5943dfbc8b2bb9ff0de55` ON `ns-app`.`pets`\n        ")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE `ns-app`.`pets`\n        ")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP INDEX `IDX_83604f081c8f39604d33db2e7d` ON `ns-app`.`areas`\n        ")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP INDEX `IDX_e9481f082921789e2cb47a79a5` ON `ns-app`.`areas`\n        ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("\n            DROP TABLE `ns-app`.`areas`\n        ")];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CreatePetAndAreaTable1636729732395;
}());
exports.CreatePetAndAreaTable1636729732395 = CreatePetAndAreaTable1636729732395;
