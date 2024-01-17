import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  private timerSubscription: Subscription | undefined;
  loginForm!: FormGroup;
  isError={isUser:false,isPassWrong:false};
  isLoading=false;
  isresetSuccess=false;
  constructor(private router:Router,private fb: FormBuilder, private authService:AuthService) {}
  
  ngOnInit(): void {
    this.initLoginForm();
  }
  initLoginForm() {
    this.loginForm = this.fb.group({
      username: [`${this.authService?.user?.username}`],
      password: ['',[Validators.required]],
      confirmPassword: ['',[Validators.required]],

    });
  }

  onSubmit() {

    if (this.loginForm.valid) {
      console.log("This.form value",this.loginForm.value);
      this.isLoading=true;
      const formData = this.loginForm.value;
      this.authService.user=formData;
        this.resetPassward(formData);

    }
  }

  resetPassward(data:any){
    this.authService.resetPassword(data).subscribe((data)=>{
    if(data.status){
      localStorage.setItem('nasaTocken',data.accessToken);
      this.isLoading=false;
      this.isresetSuccess=true;
      this.isError.isUser=false;
      this.timerSubscription = timer(3000).subscribe(() => {
        this.isresetSuccess=false;
        this.router.navigate(['home']);
    });
      console.log("The reset passward data is:",data);
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
