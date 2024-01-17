import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  @ViewChild('myButton') myButton!: ElementRef;
  loginForm!: FormGroup;
  hidePassword: boolean = true;
  isuserExist=false;
  isError={isUser:false,isPassWrong:false};
  isLoading=false;
  constructor(private router:Router,private fb: FormBuilder, private authService:AuthService) {}
  
  ngOnInit(): void {
    this.initLoginForm();
  }
  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      label: ['forgot'],
    });
  }

  onSubmit() {

    if (this.loginForm.valid) {
      this.isLoading=true;
      const formData = this.loginForm.value;
      this.authService.user=formData;
        this.findUser(formData);

    }
  }
  openModal() {
    this.myButton.nativeElement.click();
   }
  findUser(data:any){
    this.authService.findUser(data).subscribe((data)=>{
    if(data.otp){
      this.isLoading=false;
      this.isError.isUser=false;
      this.authService.otpCode=data.otp;
      this.openModal();
    }else{
      this.isLoading=false;
      this.isError.isUser=true;
    }
    },
    (error:any)=>{
      this.isLoading=false;
      console.log("error is errrrrr",error);
    })
  }

}
