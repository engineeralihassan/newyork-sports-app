import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-selfie-screen1',
  templateUrl: './selfie-screen1.component.html',
  styleUrls: ['./selfie-screen1.component.scss'],
})
export class SelfieScreen1Component  implements OnInit {
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

}
