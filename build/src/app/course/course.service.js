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
exports.passCertification = exports.deleteCourse = exports.updateCourse = exports.createCertificationForCourse = exports.createCourse = exports.getCourse = exports.applyCertificationToCourse = exports.getAllCourses = void 0;
const course_1 = require("@entity/course");
const certification_1 = require("@entity/certification");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield course_1.Course.find({ relations: ['certification'] });
    }
    catch (e) {
        console.error(e);
    }
});
exports.getAllCourses = getAllCourses;
const applyCertificationToCourse = (course, certification) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdCertification = yield (0, exports.createCertificationForCourse)(certification);
        console.log(certification);
        course.certification = createdCertification;
        console.log(course);
        yield course.save();
        return course;
    }
    catch (e) {
        console.error(e);
    }
});
exports.applyCertificationToCourse = applyCertificationToCourse;
// READ SERVICE
const getCourse = (courseID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (courseID) { // get specific course
            return yield course_1.Course.findOne({
                where: { id: courseID },
            });
        }
        else { // get all courses
            return yield course_1.Course.find({ relations: ['certification'] });
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.getCourse = getCourse;
const createCourse = ({ id, owner, price, isActive, title, certification, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _newcourse = typeorm_typedi_extensions_1.Container.get(course_1.Course);
        _newcourse['id'] = id;
        _newcourse['owner'] = owner;
        _newcourse['price'] = price;
        _newcourse['isActive'] = isActive;
        _newcourse['title'] = title;
        // await _newcourse.save();
        yield (0, exports.applyCertificationToCourse)(_newcourse, certification);
        return yield course_1.Course.findOne({
            where: { id },
            relations: ['certification']
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.createCourse = createCourse;
const createCertificationForCourse = ({ id, receiveDate, result }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _newCertification = typeorm_typedi_extensions_1.Container.get(certification_1.Certification);
        _newCertification['id'] = id;
        _newCertification['receiveDate'] = receiveDate;
        _newCertification['result'] = result;
        yield _newCertification.save();
        return _newCertification;
        // await Certification.findOne({
        //   where: { id: id },
        //   relations: ['course']
        // });
    }
    catch (e) {
        console.error(e);
    }
});
exports.createCertificationForCourse = createCertificationForCourse;
const updateCourse = ({ id, owner, certification, price, isActive, title }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _updatedcourse = yield course_1.Course.findOne({ where: { id }, relations: ['certification'] });
        if (!_updatedcourse)
            return { message: "course is not found!" };
        _updatedcourse['owner'] = owner;
        _updatedcourse['price'] = price;
        _updatedcourse['isActive'] = isActive;
        _updatedcourse['title'] = title;
        if (Object.is(_updatedcourse.certification, certification))
            yield (0, exports.createCertificationForCourse)(certification);
        yield (0, exports.applyCertificationToCourse)(_updatedcourse, certification);
        return yield course_1.Course.findOne({
            where: { id },
            relations: ['certification']
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.updateCourse = updateCourse;
const deleteCourse = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundCourse = yield course_1.Course.findOne({ id: id });
        return yield (foundCourse === null || foundCourse === void 0 ? void 0 : foundCourse.remove());
    }
    catch (e) {
        console.error(e);
    }
});
exports.deleteCourse = deleteCourse;
const passCertification = (courseID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (courseID) { // get specific course
            const course = yield course_1.Course.findOne({
                where: { id: courseID },
            });
            return course === null || course === void 0 ? void 0 : course.certification;
        }
        else { // return certification
            return Error("That course wasn't found");
        }
    }
    catch (e) {
        console.error(e);
    }
});
exports.passCertification = passCertification;
