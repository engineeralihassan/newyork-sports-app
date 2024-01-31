import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private timerSubscription: Subscription | undefined;
  loginForm!: FormGroup;
  hidePassword: boolean = true;
  isuserExist = false;
  isError = {
    isUser: false,
    isPassWrong: false,
    isAdminWrong: false,
    adminLoginSuccess: false,
  };
  isLoading = false;
  loginMethod: any;
  loginAsAdmin: any;
  showAlert: any;
  errorMesg = 'Something went wrong try again';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private loc: Location,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loginMethod = this.authService.loginMethod;
    this.loginAsAdmin = this.adminService.loginAsAdmin;
    this.initLoginForm();
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  initLoginForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
    if (this.loginAsAdmin) {
      this.loginForm.get('password')?.setValidators([Validators.required]);
    }
    if (this.loginMethod === 'email') {
      this.loginForm
        .get('username')
        ?.setValidators([Validators.required, Validators.email]);
    } else if (this.loginMethod === 'phone') {
      this.loginForm.get('username')?.setValue('+');
      this.loginForm
        .get('username')
        ?.setValidators([Validators.required, Validators.pattern('[0-9+]+')]);
    } else if (this.loginMethod === 'username') {
      this.loginForm.get('username')?.setValidators([Validators.required]);
    }
  }
  goBack() {
    this.loc.back();
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const formData = this.loginForm.value;
      if (this.adminService.loginAsAdmin) {
        this.loginAdminProceed(formData);
      } else if (this.isuserExist) {
        this.login(formData);
      } else {
        this.authService.user = formData;
        this.findUser(formData);
      }
    }
  }
  loginAdminProceed(data: any) {
    this.isLoading = true;
    this.adminService.loginAdminProceed(data).subscribe(
      (data) => {
        this.isLoading = false;
        if (data.status) {
          localStorage.setItem('nasaAdminTocken', data.accessToken);
          console.log('The data as admin', data);
          this.adminService.setAdmin(data);
          this.isError.isAdminWrong = false;
          this.isError.adminLoginSuccess = true;
          this.timerSubscription = timer(1000).subscribe(() => {
            this.isError.adminLoginSuccess = false;
            this.router.navigate(['admin']);
          });
        } else {
          this.isError.isAdminWrong = true;
        }
      },
      (error) => {
        this.isLoading = false;
        this.showAndHideAlert();
      }
    );
  }
  findUser(data: any) {
    this.authService.findUser(data).subscribe(
      (data) => {
        if (data.status) {
          this.loginForm?.get('password')?.setValidators([Validators.required]);
          this.isuserExist = true;
          this.isLoading = false;
          this.isError.isUser = false;
        } else if (!data.status && data?.otp) {
          this.authService.otpCode = data.otp;
          this.router.navigate(['verification/otp-verification']);
        } else {
          this.isLoading = false;
          this.loginForm.get('password')?.clearValidators();
          this.isError.isUser = true;
        }
        this.loginForm.get('password')?.updateValueAndValidity();
      },
      (error: any) => {
        this.isLoading = false;
        console.log('error is errrrrr', error);
      }
    );
  }
  showAndHideAlert(): void {
    this.showAlert = true;
    console.log('Errorrorroorooror');
    this.timerSubscription = timer(4000).subscribe(() => {
      this.showAlert = false;
    });
  }
  login(data: any) {
    this.authService.logIn(data).subscribe(
      (data) => {
        if (data.status) {
          localStorage.setItem('nasaTocken', data.accessToken);
          this.authService.isLoggedin = true;
          this.isLoading = false;
          this.isError.isPassWrong = false;
          this.router.navigate(['home']);
        } else {
          this.isLoading = false;
          this.isError.isPassWrong = true;
        }
      },
      (error: any) => {
        this.isLoading = false;
        console.log('error is errrrrr', error);
      }
    );
  }
}
