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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyCourse = exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPayment = exports.applyUserToPayment = exports.getAllPayments = void 0;
const course_1 = require("@entity/course");
const payment_1 = require("@entity/payment");
const user_1 = require("@entity/user");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const getAllPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield payment_1.Payment.find({ relations: ['user'] });
    }
    catch (e) {
        console.error(e);
    }
});
exports.getAllPayments = getAllPayments;
const applyUserToPayment = (paymentID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield payment_1.Payment.findOne({
            where: { id: paymentID },
        });
        if (userID) {
            const user = yield user_1.User.findOne({
                where: { id: userID }
            });
            payment.user = user;
            yield (payment === null || payment === void 0 ? void 0 : payment.save());
        }
        return payment;
    }
    catch (e) {
        console.error(e);
    }
});
exports.applyUserToPayment = applyUserToPayment;
// READ SERVICE
const getPayment = (paymentID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (paymentID) { // get specific payment
            return yield payment_1.Payment.findOne({
                where: { id: paymentID },
            });
        }
        else { // get all payments
            return yield payment_1.Payment.find({ relations: ['user'] });
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.getPayment = getPayment;
const createPayment = ({ id, cardNumber, userID, cvv, placeHolderName, receiver, expirationDate, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _newPayment = typeorm_typedi_extensions_1.Container.get(payment_1.Payment);
        _newPayment['id'] = id;
        _newPayment['cardNumber'] = cardNumber;
        _newPayment['cvv'] = cvv;
        _newPayment['placeHolderName'] = placeHolderName;
        _newPayment['receiver'] = receiver;
        _newPayment['expirationDate'] = expirationDate;
        yield _newPayment.save();
        (0, exports.applyUserToPayment)(_newPayment.id, userID);
        return yield payment_1.Payment.findOne({
            where: { id },
            relations: ['user']
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.createPayment = createPayment;
const updatePayment = ({ id, cardNumber, userID, cvv, placeHolderName, receiver, expirationDate }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _updatedPayment = yield payment_1.Payment.findOne({ where: { id }, relations: ['user'] });
        if (!_updatedPayment)
            return { message: "Payment is not found!" };
        _updatedPayment['id'] = id;
        _updatedPayment['cardNumber'] = cardNumber;
        _updatedPayment['cvv'] = cvv;
        _updatedPayment['placeHolderName'] = placeHolderName;
        _updatedPayment['receiver'] = receiver;
        _updatedPayment['expirationDate'] = expirationDate;
        yield _updatedPayment.save();
        return yield payment_1.Payment.findOne({
            where: { id },
            relations: ['user']
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.updatePayment = updatePayment;
const deletePayment = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundPayment = yield payment_1.Payment.findOne({ id: id });
        return yield (foundPayment === null || foundPayment === void 0 ? void 0 : foundPayment.remove());
    }
    catch (e) {
        console.error(e);
    }
});
exports.deletePayment = deletePayment;
const buyCourse = (courseID, paymentID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(courseID);
        if (paymentID) { // get specific payment
            const payment = yield payment_1.Payment.findOne({
                where: { id: paymentID },
            });
            const course = yield course_1.Course.findOne({
                where: { id: courseID },
                relations: ['certification']
            });
            return (payment === null || payment === void 0 ? void 0 : payment.receiver) === (course === null || course === void 0 ? void 0 : course.owner) ? course : Error("Your payment was performed for another course");
        }
        else { // get all payments
            return Error("That course or payment wasn't found");
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.buyCourse = buyCourse;
