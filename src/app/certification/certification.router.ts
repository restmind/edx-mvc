import { Body, Controller, Delete, Get, Post, Query, Route, Tags } from 'tsoa';
import { EntityManager } from 'typeorm';
import CertificationService  from './certification.service';

@Tags('Certification')
@Route('/api/certification')
export class CertificationController extends Controller {

  @Get('/get-all/')
  public async getAllCertifications() {
    let certificationService = new CertificationService()
    return certificationService.getAllCertifications()
  }

  @Post('/create/')
  public async createCertification(@Body() body: any) {
    let certificationService = new CertificationService()
    return certificationService.createCertification({ id: body.id, receiveDate: body.receiveDate, result:body.result, course:body.course  });
  }

  @Delete('/delete/{id}/')
  public async deleteCertification(@Query('id') id: string) {
    let certificationService = new CertificationService()
    return certificationService.deleteCertification({ id: String(id) });
  }
}

