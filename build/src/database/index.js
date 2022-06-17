"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({});
class Database {
    constructor() {
        this.connectToDB();
    }
    connectToDB() {
        (0, typeorm_1.useContainer)(typeorm_typedi_extensions_1.Container);
        (0, typeorm_1.createConnection)({
            type: envString("mysql", "mysql"),
            host: envString(process.env.DATABASE_HOST, "localhost"),
            port: envString(Number(process.env.DATABASE_PORT), 3306),
            username: envString(process.env.DATABASE_USERNAME, "root"),
            password: envString(process.env.DATABASE_PASSWORD, "123456789"),
            database: envString(process.env.DATABASE_NAME, "courses"),
            entities: [
                __dirname + "/entity/*.ts",
                __dirname + "/entity/*.js"
            ],
            synchronize: true,
            logging: false
        }).then(_con => {
            this.connection = _con;
            console.log("Connected to db!!");
        }).catch(console.error);
    }
}
function envString(prodString, devString) {
    return process.env.NODE_ENV === 'production' ? prodString : devString;
}
exports.db = new Database();
