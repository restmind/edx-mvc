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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDataController = void 0;
const course_service_1 = require("./../course/course.service");
const tsoa_1 = require("tsoa");
const user_service_1 = require("../user/user.service");
const payment_service_1 = require("../payment/payment.service");
let CreateDataController = class CreateDataController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.transferStringToResult = (text) => {
            let result;
            switch (text) {
                case "excelent":
                    result = "excelent";
                    break;
                case "good":
                    result = "good";
                    break;
                case "satisfying":
                    result = "satisfying";
                    break;
                case "could be better":
                    result = "could be better";
                    break;
                default:
                    result = "polino";
            }
            return result;
        };
        this.createEntitiesFromFile = (rowData) => __awaiter(this, void 0, void 0, function* () {
            //Rows
            const users = [];
            for (var i = 0; i < rowData.length - 1; i++) {
                var jsonObj = [];
                var objects = rowData[i].split('|');
                // Object in a single row
                let user;
                let payment;
                let course;
                let certification;
                for (var j = 0; j < objects.length; j++) {
                    var data = objects[j].split(',');
                    if (j == 0) {
                        data.pop();
                        user = yield (0, user_service_1.createUser)({ email: data[0], firstName: data[1], lastName: data[2], type: data[3] == "admin" ? "admin" : "user", phoneNumber: data[4], location: data[5], id: data[6] });
                        console.log(user);
                    }
                    else if (j == objects.length - 2) {
                        data.pop();
                        data.shift();
                        certification = { id: data[0], receiveDate: data[1], result: this.transferStringToResult(data[2]) };
                        console.log('Certificate', certification);
                    }
                    else if (j == objects.length - 3) {
                        data.pop();
                        data.shift();
                        payment = yield (0, payment_service_1.createPayment)({ cardNumber: data[0], userID: user === null || user === void 0 ? void 0 : user.id, cvv: data[1], placeHolderName: data[2], receiver: data[3], expirationDate: data[4], id: data[5] });
                        console.log(payment);
                    }
                    else if (j == objects.length - 1) {
                        data.shift();
                        course = (0, course_service_1.createCourse)({ id: data[0], owner: data[1], price: data[2], isActive: data[3] === 'true' ? true : false, title: data[4], certification: certification });
                        console.log('Course', course);
                    }
                    jsonObj.push(data);
                }
            }
        });
    }
    createUser(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const rowData = file.buffer.toString().split('\n');
            // Rows
            this.createEntitiesFromFile(rowData);
        });
    }
};
__decorate([
    (0, tsoa_1.Post)('/create/'),
    __param(0, (0, tsoa_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateDataController.prototype, "createUser", null);
CreateDataController = __decorate([
    (0, tsoa_1.Tags)('Create Data'),
    (0, tsoa_1.Route)('/api/createData')
], CreateDataController);
exports.CreateDataController = CreateDataController;
