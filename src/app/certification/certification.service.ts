
import { Course } from '@entity/course';
import { Certification } from '@entity/certification';
import { Container } from 'typeorm-typedi-extensions';
import { Service,  } from 'typedi';

export interface ICertification {
    id: string,
    receiveDate: string,
    result:  "excelent" | "good" | "satisfying" | "could be better" | "polino",
    course?: Course ,
  }

@Service()
  export default class CertificationService {

     applyCertificationToCourse = async ( course:Course, certification: Certification) => {
    try {
      const _newcourse = Container.get(Course);
    _newcourse['owner'] = course.owner;
    _newcourse['price'] = course.price;
    _newcourse['isActive'] = course.isActive;
    _newcourse['title'] = course.title;
      
        
        _newcourse['certification']=certification;
        await _newcourse.save();
      
      return course;
  
    } catch (e) {
      console.error(e);
    }
  }

    getAllCertifications = async () => {
    try {
      return await Certification.find({ relations: ['course'] });
    } catch (e) {
      console.error(e);
    }
  }

  // READ SERVICE
  getCertification = async (certificationID?: string) => {
    try {
      if (certificationID) {   // get specific certification
        return await Certification.findOne({
          where: { id: certificationID },
        });
      } else {        // get all certifications
        return await Certification.find({ relations: ['course'] });
      }
    } catch (e) {
      console.error(e);
    }
  }

    createCertification = async ({ id,receiveDate, result, course  }: 
    ICertification) => {
    try {
      const _newCertification = Container.get(Certification);
      _newCertification['id'] = id;
      _newCertification['receiveDate'] = receiveDate;
      _newCertification['result'] = result;
      await _newCertification.save();
      if (course){
          this.applyCertificationToCourse(course,_newCertification );
      }
  
      return await Certification.findOne({
        where: { id: id },
        relations: ['course']
      });
  
    } catch (e) {
      console.error(e);
    }
  }

    deleteCertification = async ({ id }: { id: string }) => {
    try {
      const foundCertification = await Certification.findOne({ id: id });
      return await foundCertification?.remove();
    } catch (e) {
      console.error(e);
    }
  }

  

  
}