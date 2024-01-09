import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfieScreen1Component } from './selfie-screen1/selfie-screen1.component';
import { SelfieScreen2Component } from './selfie-screen2/selfie-screen2.component';
import { SelfieScreen3Component } from './selfie-screen3/selfie-screen3.component';


import { SelfiePage } from './selfie.page';
import { SelfieScreen4Component } from './selfie-screen4/selfie-screen4.component';

const routes: Routes = [
  {
    path: '',
    component: SelfiePage,
    children: [
      { path: 'screen1', component: SelfieScreen1Component },
      { path: 'screen2', component: SelfieScreen2Component },
      { path: 'screen3', component: SelfieScreen3Component },
      { path: 'screen4', component: SelfieScreen4Component },
      { path: '', redirectTo: 'screen1', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfiePageRoutingModule {}
