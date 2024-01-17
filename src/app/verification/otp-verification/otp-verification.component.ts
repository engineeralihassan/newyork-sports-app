import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, timer } from 'rxjs';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent  implements OnInit {
  private timerSubscription: Subscription | undefined;
  otp: any[] = [null, null, null, null,null,null];
  inputCount = 0;
  finalInput = '';
  showSubmitButton = false;
  otpcode!:any;
  isOtpCorrect=false;
  isOtpError=false;
  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(): void {
  this.otpcode=this.authService.otpCode;
  console.log("The code is::",this.otpcode)
    this.startInput();
  }

  startInput(): void {
    this.inputCount = 0;
    this.finalInput = '';
    this.otp = [null, null, null, null];
    this.enableInput(0);
  }

  isInputDisabled(index: number): boolean {
    return index < this.inputCount;
  }

  handleInput(index: number, event: any): void {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
    let { value } = event.target;

    if (value.length == 1) {
      this.finalInput += value;
      this.disableInput(index);
      if (this.inputCount < 5) {
        this.enableInput(index + 1);
      }else{
        this.authService.logIn(true);
        if(this.otp.length>4){
          let optvalue=this.otp.join('');
          let data={ username:`${this.authService.user.username}`,otp:`${optvalue}`}
          this.verifyOtpRequest(data);
          
        }
    
      }
      this.inputCount += 1;
    } else if (value.length == 0 && event.key == 'Backspace') {
      this.finalInput = this.finalInput.substring(0, this.finalInput.length - 1);
      this.inputCount = Math.max(0, this.inputCount - 1);
      this.disableInput(index);
      if (index > 0) {
        this.enableInput(index - 1);
      }
    } else if (value.length > 1) {
      event.target.value = value.split('')[0];
    }
  }

  disableInput(index: number): void {
    this.otp[index] = +this.finalInput.charAt(index); // Convert to number
    document.getElementById(`otp-input-${index}`)?.blur();
  }

  enableInput(index: number): void {
    if (index >= 0 && index < 6) {
      document.getElementById(`otp-input-${index}`)?.focus();
    }
  }

  verifyOtpRequest(otp:any){
   this.authService.verifyOtp(otp).subscribe((data)=>{
    if(data.status){
      this.isOtpError=false;
      this.isOtpCorrect=true;
      console.log("the otp data request",data);
      this.timerSubscription = timer(3000).subscribe(() => {
          this.router.navigate(['verification/reset-password']);
      });
    }else{
      this.isOtpError=true;
      this.startInput();
    }
   })
  }
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

 
  

}
