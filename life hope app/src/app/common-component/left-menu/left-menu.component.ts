import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  redirectToDash(){
    this.router.navigate(['dashboard']);
  }
redirectToorder(){
  this.router.navigate(['order-list']);
}
}
