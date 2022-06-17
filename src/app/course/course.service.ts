import { ICertification } from './../certification/certification.service';
import { Course } from '@entity/course';
import { Certification } from '@entity/certification';
import { Container } from 'typeorm-typedi-extensions';

export interface ICourse {
    id:string,
    owner: string,
    price: string,
    isActive: boolean,
    title: string,
    certification: ICertification  ,
  }

export const getAllCourses = async () => {
  try {
    return await Course.find({ relations: ['certification'] });
  } catch (e) {
    console.error(e);
  }
}

export const applyCertificationToCourse = async ( course:Course, certification: ICertification) => {
  try {
    
     const createdCertification = await createCertificationForCourse(certification);
     
      console.log(certification);
      course.certification=createdCertification!;
      console.log(course);
      await course.save();
    
    return course;

  } catch (e) {
    console.error(e);
  }
}

// READ SERVICE
export const getCourse = async (courseID?: string) => {
  try {
    if (courseID) {   // get specific course
      return await Course.findOne({
        where: { id: courseID },
      });
    } else {        // get all courses
      return await Course.find({ relations: ['certification'] });
    }
  } catch (e) {
    console.error(e);
  }
}

export const createCourse = async ({ id,owner,price, isActive, title, certification, }: 
  ICourse) => {
  try {
    const _newcourse = Container.get(Course);
    _newcourse['id'] = id;
    _newcourse['owner'] = owner;
    _newcourse['price'] = price;
    _newcourse['isActive'] = isActive;
    _newcourse['title'] = title;
    // await _newcourse.save();
    

    await applyCertificationToCourse(_newcourse,certification);
    
    return await Course.findOne({
      where: { id },
      relations: ['certification']
    });

  } catch (e) {
    console.error(e);
  }
}

export const createCertificationForCourse = async ({ id,receiveDate, result  }: 
    ICertification) => {
    try {
      const _newCertification = Container.get(Certification);
      _newCertification['id'] = id;
      _newCertification['receiveDate'] = receiveDate;
      _newCertification['result'] = result;
      await _newCertification.save();
  
      return _newCertification;
      // await Certification.findOne({
      //   where: { id: id },
      //   relations: ['course']
      // });
  
    } catch (e) {
      console.error(e);
    }
  }

export const updateCourse = async ({ id, owner, certification, price, isActive, title }: ICourse) => {
  try {
    const _updatedcourse = await Course.findOne({ where: { id }, relations: ['certification'] });
    if (!_updatedcourse) return { message: "course is not found!" };
    _updatedcourse['owner'] = owner;
    _updatedcourse['price'] = price;
    _updatedcourse['isActive'] = isActive;
    _updatedcourse['title'] = title;
    if (Object.is(_updatedcourse.certification,certification)) await createCertificationForCourse(certification);
    await applyCertificationToCourse(_updatedcourse,certification);

    return await Course.findOne({
      where: { id },
      relations: ['certification']
    });

  } catch (e) {
    console.error(e);
  }
}

export const deleteCourse = async ({ id }: { id: string }) => {
  try {
    const foundCourse = await Course.findOne({ id: id });
    return await foundCourse?.remove();
  } catch (e) {
    console.error(e);
  }
}

export const passCertification = async ( courseID:string) => {
    try {
      if (courseID) {   // get specific course
         const course = await Course.findOne({
          where: { id: courseID },
        });
        return course?.certification
      } else {        // return certification
        return Error("That course wasn't found")
      }
    } catch (e) {
      console.error(e);
    }
  }