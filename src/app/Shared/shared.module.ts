import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { ManuTabsComponent } from '../manu-tabs/manu-tabs.component';

@NgModule({
  declarations: [ErrorAlertComponent, ManuTabsComponent],
  imports: [CommonModule, IonicModule],
  exports: [CommonModule, IonicModule, ErrorAlertComponent, ManuTabsComponent],
})
export class SharedModule {}
