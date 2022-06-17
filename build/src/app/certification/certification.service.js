"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const course_1 = require("@entity/course");
const certification_1 = require("@entity/certification");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typedi_1 = require("typedi");
let CertificationService = class CertificationService {
    constructor() {
        this.applyCertificationToCourse = (course, certification) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _newcourse = typeorm_typedi_extensions_1.Container.get(course_1.Course);
                _newcourse['owner'] = course.owner;
                _newcourse['price'] = course.price;
                _newcourse['isActive'] = course.isActive;
                _newcourse['title'] = course.title;
                _newcourse['certification'] = certification;
                yield _newcourse.save();
                return course;
            }
            catch (e) {
                console.error(e);
            }
        });
        this.getAllCertifications = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield certification_1.Certification.find({ relations: ['course'] });
            }
            catch (e) {
                console.error(e);
            }
        });
        // READ SERVICE
        this.getCertification = (certificationID) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (certificationID) { // get specific certification
                    return yield certification_1.Certification.findOne({
                        where: { id: certificationID },
                    });
                }
                else { // get all certifications
                    return yield certification_1.Certification.find({ relations: ['course'] });
                }
            }
            catch (e) {
                console.error(e);
            }
        });
        this.createCertification = ({ id, receiveDate, result, course }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _newCertification = typeorm_typedi_extensions_1.Container.get(certification_1.Certification);
                _newCertification['id'] = id;
                _newCertification['receiveDate'] = receiveDate;
                _newCertification['result'] = result;
                yield _newCertification.save();
                if (course) {
                    this.applyCertificationToCourse(course, _newCertification);
                }
                return yield certification_1.Certification.findOne({
                    where: { id: id },
                    relations: ['course']
                });
            }
            catch (e) {
                console.error(e);
            }
        });
        this.deleteCertification = ({ id }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundCertification = yield certification_1.Certification.findOne({ id: id });
                return yield (foundCertification === null || foundCertification === void 0 ? void 0 : foundCertification.remove());
            }
            catch (e) {
                console.error(e);
            }
        });
    }
};
CertificationService = __decorate([
    (0, typedi_1.Service)()
], CertificationService);
exports.default = CertificationService;
