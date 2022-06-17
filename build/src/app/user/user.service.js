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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.applyPaymentsToUser = exports.getAllUser = void 0;
const payment_1 = require("@entity/payment");
const user_1 = require("@entity/user");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_1.User.find({ relations: ['payments'] });
    }
    catch (e) {
        console.error(e);
    }
});
exports.getAllUser = getAllUser;
const applyPaymentsToUser = (userID, paymentIDs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({
            where: { id: userID },
        });
        if (paymentIDs) {
            yield Promise.all(paymentIDs.map((_paymentID) => __awaiter(void 0, void 0, void 0, function* () {
                const payment = yield payment_1.Payment.findOne({
                    where: { id: _paymentID }
                });
                payment.user = user;
                yield (payment === null || payment === void 0 ? void 0 : payment.save());
            })));
        }
        return user;
    }
    catch (e) {
        console.error(e);
    }
});
exports.applyPaymentsToUser = applyPaymentsToUser;
// READ SERVICE
const getUser = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (userID) { // get specific user
            return yield user_1.User.findOne({
                where: { id: userID },
            });
        }
        else { // get all users
            return yield user_1.User.find({ relations: ['payments'] });
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.getUser = getUser;
const createUser = ({ id, email, paymentIDs, firstName, lastName, type, phoneNumber, location }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _newUser = typeorm_typedi_extensions_1.Container.get(user_1.User);
        _newUser['id'] = id;
        _newUser['email'] = email;
        _newUser['firstName'] = firstName;
        _newUser['lastName'] = lastName;
        _newUser['type'] = type;
        _newUser['phoneNumber'] = phoneNumber;
        _newUser['location'] = location;
        yield _newUser.save();
        (0, exports.applyPaymentsToUser)(_newUser.id, paymentIDs);
        return yield user_1.User.findOne({
            where: { id: id },
            relations: ['payments']
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.createUser = createUser;
const updateUser = ({ id, email, paymentIDs, firstName, lastName, type, phoneNumber, location }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _updatedUser = yield user_1.User.findOne({ where: { id }, relations: ['payments'] });
        if (!_updatedUser)
            return { message: "User is not found!" };
        _updatedUser['email'] = email;
        _updatedUser['firstName'] = firstName;
        _updatedUser['lastName'] = lastName;
        _updatedUser['type'] = type;
        _updatedUser['phoneNumber'] = phoneNumber;
        _updatedUser['location'] = location;
        yield Promise.all((_a = _updatedUser['payments']) === null || _a === void 0 ? void 0 : _a.map((_payment) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return _payment.remove();
            }
            catch (e) {
                console.error(e);
            }
        })));
        yield _updatedUser.save();
        (0, exports.applyPaymentsToUser)(_updatedUser.id, paymentIDs);
        return yield user_1.User.findOne({
            where: { id },
            relations: ['payments']
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.updateUser = updateUser;
const deleteUser = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield user_1.User.findOne({ id: id });
        return yield (foundUser === null || foundUser === void 0 ? void 0 : foundUser.remove());
    }
    catch (e) {
        console.error(e);
    }
});
exports.deleteUser = deleteUser;
