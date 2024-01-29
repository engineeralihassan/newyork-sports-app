import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SelfiePageRoutingModule } from './selfie-routing.module';
import { SelfiePage } from './selfie.page';
import { SelfieScreen1Component } from './selfie-screen1/selfie-screen1.component';
import { SelfieScreen3Component } from './selfie-screen3/selfie-screen3.component';
import { SelfieScreen2Component } from './selfie-screen2/selfie-screen2.component';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfiePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    SelfiePage,
    SelfieScreen1Component,
    SelfieScreen3Component,
    SelfieScreen2Component,
  ],
})
export class SelfiePageModule {}
