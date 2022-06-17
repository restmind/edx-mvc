import { ICertification } from './../certification/certification.service';
import { Certification } from '@entity/certification';
import {  createCourse } from './../course/course.service';
import {  Controller, Post, Route, Tags, UploadedFile } from 'tsoa';
import {  createUser } from '../user/user.service';
import { createPayment } from '../payment/payment.service';

@Tags('Create Data')
@Route('/api/createData')
export class CreateDataController extends Controller {

  transferStringToResult= (text:any)=>{
    let result:"excelent" | "good" | "satisfying" | "could be better" | "polino";
    switch (text) {
      case "excelent":
        result= "excelent";
        break;
      case "good":
        result= "good";
        break;
      case "satisfying":
        result= "satisfying";
        break;
      case "could be better":
        result= "could be better";
        break;
      default:
        result= "polino";
    }
    return result;
  }

    createEntitiesFromFile= async (rowData:string[])=>{
      //Rows
      const users=[]
        for(var i = 0; i < rowData.length-1; i++) {
            var jsonObj = [];
            var objects = rowData[i].split('|');
            // Object in a single row
            let user;
            let payment;
            let course;
            let certification: ICertification;
            for(var j = 0; j < objects.length; j++) {
                var data:string[] = objects[j].split(',');
                if (j==0) {
                  data.pop()
                  user= await createUser({email:data[0],firstName:data[1],lastName:data[2],type:data[3]=="admin"?"admin":"user",phoneNumber:data[4],location:data[5], id:data[6]})
              console.log(user)
                }
                else if(j==objects.length-2) {
                  data.pop();
                  data.shift();
                  certification={id:data[0],receiveDate:data[1],result:this.transferStringToResult(data[2])}
                  console.log('Certificate',certification)
                }
                else if(j==objects.length-3) {
                  data.pop();
                  data.shift();
                  payment=await createPayment({cardNumber:data[0],userID:user?.id, cvv:data[1], placeHolderName:data[2], receiver:data[3], expirationDate:data[4], id:data[5]})
                  console.log(payment)
                }
                else if(j==objects.length-1) {
                    data.shift();
                    course= createCourse({id:data[0],owner:data[1], price:data[2],isActive:data[3]==='true'?true:false, title:data[4],certification:certification!})
                    console.log('Course',course)
                }
                jsonObj.push(data)
                
              }
            }
    }

  @Post('/create/')
  public async createUser(@UploadedFile() file:Express.Multer.File) {
  const rowData=file.buffer.toString().split('\n');
  // Rows
  this.createEntitiesFromFile(rowData);
  
  
}
}

