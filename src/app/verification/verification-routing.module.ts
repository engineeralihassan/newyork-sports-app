import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationPage } from './verification.page';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: VerificationPage,
    children:[
      {path:'recover-password',component:ForgetPasswordComponent},
      {path:'otp-verification',component:OtpVerificationComponent},
      {path:'reset-password',component:ResetPasswordComponent},
      {path:'', redirectTo:'recover-password',pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationPageRoutingModule {}
