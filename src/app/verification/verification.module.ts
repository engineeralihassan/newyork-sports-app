import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerificationPageRoutingModule } from './verification-routing.module';
import { VerificationPage } from './verification.page';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    VerificationPage,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    OtpVerificationComponent,
  ],
})
export class VerificationPageModule {}
