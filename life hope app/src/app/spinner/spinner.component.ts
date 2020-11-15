import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../common/service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  showProgress:boolean;
  constructor(private spinnerService: SpinnerService) { 
    spinnerService.showSpinner.subscribe(t=>this.showProgress =t);

    this.spinnerService.getResponseMessage().subscribe(msg =>{
      console.log(msg)
    });
  }

  ngOnInit(): void {
  }

}
