import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// import { ModelAlertComponent } from '../model-alert/model-alert.component';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
@NgModule({
  declarations: [ErrorAlertComponent],
  imports: [CommonModule, IonicModule],
  exports: [CommonModule, IonicModule, ErrorAlertComponent],
})
export class SharedModule {}
