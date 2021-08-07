"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
dotenv_1.default.config();
var app = express_1.default();
var APP_PORT = parseInt(process.env.APP_PORT, 10);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
// 印出 env 的檔案 for bug
app.get('/env', function (req, res) {
    res.json(process.env);
});
app.listen(APP_PORT, function () {
    console.log("App listening at http://localhost:" + APP_PORT);
});
