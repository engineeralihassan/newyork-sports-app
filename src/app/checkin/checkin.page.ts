import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
screen2=false;
  constructor() { }

  ngOnInit() {
  }
  changeScreen(){
    this.screen2=true;
  }

}
