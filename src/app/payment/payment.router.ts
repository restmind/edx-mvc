import { Body, Controller, Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { getAllPayments, createPayment, updatePayment, deletePayment, IPayment, buyCourse } from './payment.service';

@Tags('Payment')
@Route('/api/payment')
export class PaymentController extends Controller {

  @Get('/get-all/')
  public async getAllPayments() {
    return getAllPayments()
  }

  @Get('/buy-course/{paymentId}/{courseId}/')
  public async buyCourse(@Query('paymentId') paymentId: string,@Query('courseId') courseId: string) {
    return buyCourse(courseId,paymentId)
  }

  @Post('/create/')
  public async createPayment(@Body() body: IPayment) {
    return createPayment({ cardNumber: body.cardNumber, userID: body.userID, cvv:body.cvv, placeHolderName:body.placeHolderName, receiver:body.receiver, expirationDate:body.expirationDate, id:body.id });
  }

  @Put('/update/{id}/')
  public async updatePayment(@Query('id') id: string, @Body() body: IPayment) {
    return updatePayment({ id: String(id), cardNumber: body.cardNumber, userID: body.userID, cvv:body.cvv, placeHolderName:body.placeHolderName, receiver:body.receiver, expirationDate:body.expirationDate });
  }

  @Delete('/delete/{id}/')
  public async deletePayment(@Query('id') id: string) {
    return deletePayment({ id: String(id) });
  }

}

