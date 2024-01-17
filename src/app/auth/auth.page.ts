import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
isLoading=false;
private timerSubscription: Subscription | undefined;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.isLoading=true;
    if (this.authService.isLoggedin) {
      this.timerSubscription = timer(2000).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      });
    } else {
      console.log('isLoggedIn is:', this.authService.isLoggedin);
      this.timerSubscription = timer(2000).subscribe(() => {
        this.isLoading = false;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

}
