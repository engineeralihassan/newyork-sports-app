import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from '../services/matches.service';

@Component({
  selector: 'app-model-alert',
  templateUrl: './model-alert.component.html',
  styleUrls: ['./model-alert.component.scss'],
})
export class ModelAlertComponent  implements OnInit {
  checkInData:any;
  constructor(private router:Router,private dataService:MatchesService) { }

  ngOnInit() {
    this.getObject();
  }
  getObject(): any {
    this.dataService.getObjectSubject().subscribe((obj) => {
      console.log("the data is chnaged",obj);
      this.checkInData = obj;
    });
  }
  navigations(){
    this.router.navigate(['verification/otp-verification']);
  }
  logout(){
    localStorage.removeItem('nasaTocken');
    this.router.navigate(['login']);
  }

}
