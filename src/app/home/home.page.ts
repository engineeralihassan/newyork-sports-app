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

  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      this.showInput=!this.showInput;
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }
  isLoggedin=false;
  matches=[1,2,3,4,5,6,7,8]

  constructor(private router:Router, private authService:AuthService) {
    console.log("The loggen is uer::",this.authService.isLoggedin);
  }
  ngOnInit(){
    console.log(this.authService.isLoggedin);
    if(!this.authService.isLoggedin){
      setTimeout(()=>{
        this.router.navigate(['/auth']);
        },2000);
    }else{
      this.isLoggedin=true;
    }
  }
}
