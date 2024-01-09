import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  otp: any[] = [null, null, null, null,null,null];
  inputCount = 0;
  finalInput = '';
  showSubmitButton = false;
  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(): void {
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
        this.router.navigate(['home']);
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

  validateOTP(): void {
    alert('Success');
  }


  

}
