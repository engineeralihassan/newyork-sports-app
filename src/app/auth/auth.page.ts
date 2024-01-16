import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
isLoading=false;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(){
    this.isLoading=true;
    if(this.authService.isLoggedin){
      setTimeout(()=>{
        this.isLoading=false;
        this.router.navigate(['/home']);
        },2000);
    }else{
       console.log("is logedin is ::",this.authService.isLoggedin)
       setTimeout(()=>{
        this.isLoading=false;
        },2000);
    }
  }

}
