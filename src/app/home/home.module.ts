import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ManuTabsComponent } from '../manu-tabs/manu-tabs.component';
import { ModelAlertComponent } from '../model-alert/model-alert.component';
import { SharedModule } from '../Shared/shared.module';
DatePipe;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  providers: [DatePipe],
  declarations: [HomePage, ManuTabsComponent],
})
export class HomePageModule {}
