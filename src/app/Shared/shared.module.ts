import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { ManuTabsComponent } from './manu-tabs/manu-tabs.component';
import { ModelAlertComponent } from './model-alert/model-alert.component';
import { LocalDateTimePipe } from './local-date-time.pipe';

@NgModule({
  declarations: [
    ErrorAlertComponent,
    ManuTabsComponent,
    ModelAlertComponent,
    LocalDateTimePipe,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    CommonModule,
    IonicModule,
    ErrorAlertComponent,
    ManuTabsComponent,
    ModelAlertComponent,
    DatePipe,
    LocalDateTimePipe,
  ],
  providers: [DatePipe],
})
export class SharedModule {}
