import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';
import { SharedModule } from '../Shared/shared.module';
import { DatePipe } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SingleUserComponent } from './single-user/single-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    AdminPage,
    DetailsComponent,
    MainPageComponent,
    SingleUserComponent,
  ],
  providers: [DatePipe],
})
export class AdminPageModule {}
