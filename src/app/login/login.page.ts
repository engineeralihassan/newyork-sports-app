import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  hidePassword: boolean = true;
  isuserExist=false;
  isError={isUser:false,isPassWrong:false};
  isLoading=false;
  constructor(private router:Router,private fb: FormBuilder, private authService:AuthService,private loc:Location) {}
  
  ngOnInit(): void {
    this.initLoginForm();
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [''],
    });
  }
  goBack(){
    this.loc.back();
  }
  onSubmit() {

    if (this.loginForm.valid) {
      this.isLoading=true;
      const formData = this.loginForm.value;
      if(this.isuserExist){
        this.login(formData)
      }else{
        this.findUser(formData);
      }
      
    }
  }

  findUser(data:any){
    this.authService.findUser(data).subscribe((data)=>{
    if(data.status){
      this.loginForm?.get('password')?.setValidators([Validators.required]);
      this.isuserExist=true;
      this.isLoading=false;
      this.isError.isUser=false;
    }else{
      this.isLoading=false;
      this.loginForm.get('password')?.clearValidators();
      this.isError.isUser=true;
    }
    this.loginForm.get('password')?.updateValueAndValidity();
    },
    (error:any)=>{
      this.isLoading=false;
      console.log("error is errrrrr",error);
    })
  }

  login(data:any){
    this.authService.logIn(data).subscribe((data)=>{
        
        if(data.status){
          localStorage.setItem('nasaTocken',data.accessToken);
          this.authService.isLoggedin=true;
          this.isLoading=false;
          this.isError.isPassWrong=false;
          this.router.navigate(['home']);
        }else{
          this.isLoading=false;
          this.isError.isPassWrong=true;
        }
        
    },
    (error:any)=>{
      this.isLoading=false;
      console.log("error is errrrrr",error);
    })
  }

}





