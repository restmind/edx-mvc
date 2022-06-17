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
exports.PaymentController = void 0;
const tsoa_1 = require("tsoa");
const payment_service_1 = require("./payment.service");
let PaymentController = class PaymentController extends tsoa_1.Controller {
    getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, payment_service_1.getAllPayments)();
        });
    }
    buyCourse(paymentId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, payment_service_1.buyCourse)(courseId, paymentId);
        });
    }
    createPayment(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, payment_service_1.createPayment)({ cardNumber: body.cardNumber, userID: body.userID, cvv: body.cvv, placeHolderName: body.placeHolderName, receiver: body.receiver, expirationDate: body.expirationDate, id: body.id });
        });
    }
    updatePayment(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, payment_service_1.updatePayment)({ id: String(id), cardNumber: body.cardNumber, userID: body.userID, cvv: body.cvv, placeHolderName: body.placeHolderName, receiver: body.receiver, expirationDate: body.expirationDate });
        });
    }
    deletePayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, payment_service_1.deletePayment)({ id: String(id) });
        });
    }
};
__decorate([
    (0, tsoa_1.Get)('/get-all/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAllPayments", null);
__decorate([
    (0, tsoa_1.Get)('/buy-course/{paymentId}/{courseId}/'),
    __param(0, (0, tsoa_1.Query)('paymentId')),
    __param(1, (0, tsoa_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "buyCourse", null);
__decorate([
    (0, tsoa_1.Post)('/create/'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    (0, tsoa_1.Put)('/update/{id}/'),
    __param(0, (0, tsoa_1.Query)('id')),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updatePayment", null);
__decorate([
    (0, tsoa_1.Delete)('/delete/{id}/'),
    __param(0, (0, tsoa_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "deletePayment", null);
PaymentController = __decorate([
    (0, tsoa_1.Tags)('Payment'),
    (0, tsoa_1.Route)('/api/payment')
], PaymentController);
exports.PaymentController = PaymentController;
