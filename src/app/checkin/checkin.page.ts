import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../services/matches.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
screen2=false;
  constructor(private matcheService:MatchesService) { }

  ngOnInit() {
  if(this.matcheService.checkinFail){
    this.changeScreen();
  }
  }
  changeScreen(){
    this.screen2=true;
  }

}
