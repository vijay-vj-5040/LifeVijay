import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../common/service/spinner.service';


export interface Response{
  message:string;
  color:string;
  isOk?:boolean;
}
@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {

  responseMsg:Response[]=[];
  showChip:boolean;
  removable =true;
  constructor(private spinnerService:SpinnerService) {
    this.spinnerService.getResponseMessage().subscribe(res=>{
      debugger
      console.log(res)
    })
   }

  ngOnInit(): void {
    this.showChip =false;
    this.spinnerService.getResponseMessage().subscribe(msg =>{
      debugger
      if(msg.status){
        this.showChip =msg.status;
        const chilpDetails:Response ={
          message:msg.response.message=== null? msg.message:msg.response.message,
          color:msg.color,
          isOk:msg.response.isOk
        };
        this.responseMsg.push(chilpDetails);
      }
    });
  }
  remove(i){
    this.responseMsg.splice(i,1);
  }

}
