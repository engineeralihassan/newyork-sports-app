import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { Location } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { MatchesService } from '../services/matches.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  private timerSubscription: Subscription | undefined;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loc: Location,
    private adminService: AdminService,
    private service: MatchesService
  ) {}

  ngOnInit(): void {
    this.service.checkAndRequestLocationPermission();
    this.isLoading = true;
    if (this.authService.isLoggedin) {
      this.timerSubscription = timer(2000).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      });
    } else {
      this.timerSubscription = timer(2000).subscribe(() => {
        this.isLoading = false;
      });
    }
  }
  goBack() {
    this.loc.back();
  }
  asAdmin() {
    this.adminService.setLoginAsAdmin(true);
    this.authService.setLoginMethod('username');
    this.router.navigate(['login']);
  }
  setloginMethod(method: any) {
    this.authService.setLoginMethod(method);
    this.adminService.setLoginAsAdmin(false);
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
