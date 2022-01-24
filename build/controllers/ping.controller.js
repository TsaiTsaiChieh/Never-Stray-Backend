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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ConnectionController = void 0;
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
var ConnectionController = /** @class */ (function () {
    function ConnectionController() {
    }
    ConnectionController.prototype.pingAPI = function (req, res) {
        return res.send('Pong');
    };
    ConnectionController.prototype.pingDB = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var con, canConnect, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        con = typeorm_1.getConnectionManager().get();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        canConnect = false;
                        if (!!con.isConnected) return [3 /*break*/, 3];
                        return [4 /*yield*/, con.connect()
                            // Store connection result
                        ];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        // Store connection result
                        canConnect = con.isConnected;
                        if (!canConnect)
                            return [2 /*return*/, res.send('Database connection failed')];
                        else
                            return [2 /*return*/, res.send('Database connection successfully')];
                        return [3 /*break*/, 7];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.send("Database error happened: " + error_1)];
                    case 5: return [4 /*yield*/, con.close()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Get('/api'),
        __param(0, routing_controllers_1.Req()),
        __param(1, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], ConnectionController.prototype, "pingAPI", null);
    __decorate([
        routing_controllers_1.Get('/db'),
        __param(0, routing_controllers_1.Req()),
        __param(1, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ConnectionController.prototype, "pingDB", null);
    ConnectionController = __decorate([
        routing_controllers_1.Controller('/ping')
    ], ConnectionController);
    return ConnectionController;
}());
exports.ConnectionController = ConnectionController;