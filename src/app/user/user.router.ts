import { Body, Controller, Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { getAllUser, createUser, updateUser, deleteUser, IUser } from './user.service';

@Tags('User')
@Route('/api/user')
export class UserPermissionController extends Controller {

  @Get('/get-all/')
  public async getAllUser() {
    return getAllUser()
  }

  @Post('/create/')
  public async createUser(@Body() body: IUser) {
    return createUser({ email: body.email, paymentIDs: body.paymentIDs, firstName:body.firstName, lastName:body.lastName, type:body.type, phoneNumber:body.phoneNumber, location:body.location, id:body.id });
  }

  @Put('/update/{id}/')
  public async updateUser(@Query('id') id: string, @Body() body: IUser) {
    return updateUser({ id: String(id), email: body.email, paymentIDs: body.paymentIDs, firstName:body.firstName, lastName:body.lastName, type:body.type, phoneNumber:body.phoneNumber, location:body.location });
  }

  @Delete('/delete/{id}/')
  public async deleteUser(@Query('id') id: string) {
    return deleteUser({ id: String(id) });
  }

}

