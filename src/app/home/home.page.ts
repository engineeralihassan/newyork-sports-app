import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SlideInOutAnimation } from './animation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [SlideInOutAnimation]
})
export class HomePage {
  showInput=false;
  isLoading=false;
  matches:any[]=[];

  constructor(private router:Router, private authService:AuthService,private datePipe: DatePipe) {
    console.log("The loggen is uer::",this.authService.isLoggedin);
  }
  ngOnInit(){
  this.isLoading=true;
  this.authService.getGames().subscribe((data)=>{
    console.log("the games data is ::",data);
    if(data.status){
      this.matches=data.programs;

      this.isLoading=false;
    }
  })
  }
  formatTime(timestamp: string): string {
    const date = new Date(Number(timestamp));
    const formattedTime = this.datePipe.transform(date, 'ha');

    return formattedTime || '';
  }
  toggleInput(){
    this.showInput=!this.showInput;
  }
  private isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
  }
}
