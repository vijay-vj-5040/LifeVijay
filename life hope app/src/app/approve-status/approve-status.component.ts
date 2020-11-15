import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve-status',
  templateUrl: './approve-status.component.html',
  styleUrls: ['./approve-status.component.scss']
})
export class ApproveStatusComponent implements OnInit {

  constructor() { }
  profileName
  ngOnInit(): void {
    this.profileName ="John Peter";
  }

}
