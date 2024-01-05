import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router, private authService:AuthService) {}
 
  ngOnInit(){
    if(!this.authService.isLoggedin){
      setTimeout(()=>{
        this.router.navigate(['/auth']);
        },2000);
    }else{
      alert("logged in successfully");
    }
  
  }

}
