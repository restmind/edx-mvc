
import { Body, Controller, Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { getAllCourses, createCourse, updateCourse, deleteCourse } from './course.service';
import { Course } from '@entity/course';
import { Service } from 'typedi';

@Tags('Course')
@Route('/api/course')
export class CourseController extends Controller {

  @Get('/get-all/')
  public async getAllCourses() {
    return getAllCourses()
  }

  @Post('/create/')
  public async createCourse(@Body() body:any) {
    return createCourse({ owner: body.owner, price: body.price, isActive:body.isActive, title:body.title, certification:body.certification, id:body.id  });
  }

  @Put('/update/{id}/')
  public async updateCourse(@Query('id') id: string, @Body() body: any) {
    return updateCourse({ id: String(id), owner: body.owner, price: body.price, isActive:body.isActive, title:body.title, certification:body.certification });
  }

  @Delete('/delete/{id}/')
  public async deleteCourse(@Query('id') id: string) {
    return deleteCourse({ id: String(id) });
  }

}

