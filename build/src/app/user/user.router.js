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
exports.UserPermissionController = void 0;
const tsoa_1 = require("tsoa");
const user_service_1 = require("./user.service");
let UserPermissionController = class UserPermissionController extends tsoa_1.Controller {
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_service_1.getAllUser)();
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_service_1.createUser)({ email: body.email, paymentIDs: body.paymentIDs, firstName: body.firstName, lastName: body.lastName, type: body.type, phoneNumber: body.phoneNumber, location: body.location, id: body.id });
        });
    }
    updateUser(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_service_1.updateUser)({ id: String(id), email: body.email, paymentIDs: body.paymentIDs, firstName: body.firstName, lastName: body.lastName, type: body.type, phoneNumber: body.phoneNumber, location: body.location });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_service_1.deleteUser)({ id: String(id) });
        });
    }
};
__decorate([
    (0, tsoa_1.Get)('/get-all/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "getAllUser", null);
__decorate([
    (0, tsoa_1.Post)('/create/'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Put)('/update/{id}/'),
    __param(0, (0, tsoa_1.Query)('id')),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Delete)('/delete/{id}/'),
    __param(0, (0, tsoa_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "deleteUser", null);
UserPermissionController = __decorate([
    (0, tsoa_1.Tags)('User'),
    (0, tsoa_1.Route)('/api/user')
], UserPermissionController);
exports.UserPermissionController = UserPermissionController;
