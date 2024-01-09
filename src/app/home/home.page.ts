import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SlideInOutAnimation } from './animation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [SlideInOutAnimation]
})
export class HomePage {
  animationState = 'out';
  showInput=false;
  isLoading=false;
  isLoggedin=false;
  matches=[1,2,3,4,5,6,7,8,9,10,11,1,2,13,14,15,16,22,33,44,55,66,77,88,90]

  constructor(private router:Router, private authService:AuthService) {
    console.log("The loggen is uer::",this.authService.isLoggedin);
  }
  ngOnInit(){
    this.isLoading=true;
    if(!this.authService.isLoggedin){
      setTimeout(()=>{
        this.isLoading=false;
        this.router.navigate(['/auth']);
        },2000);
    }else{
       console.log("is logedin is ::",this.authService.isLoggedin)
       setTimeout(()=>{
        this.isLoading=false;
        },2000);
    }
  }

  toggleInput(){
    this.showInput=!this.showInput;
  }
}
