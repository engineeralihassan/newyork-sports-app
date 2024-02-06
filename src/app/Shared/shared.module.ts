import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { ManuTabsComponent } from './manu-tabs/manu-tabs.component';
import { ModelAlertComponent } from './model-alert/model-alert.component';

@NgModule({
  declarations: [ErrorAlertComponent, ManuTabsComponent, ModelAlertComponent],
  imports: [CommonModule, IonicModule],
  exports: [
    CommonModule,
    IonicModule,
    ErrorAlertComponent,
    ManuTabsComponent,
    ModelAlertComponent,
    DatePipe,
  ],
  providers: [DatePipe],
})
export class SharedModule {}
