"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var APP_PORT = process.env.APP_PORT;
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
