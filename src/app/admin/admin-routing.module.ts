import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';
import { AdminPage } from './admin.page';
import { SingleUserComponent } from './single-user/single-user.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      { path: 'user', component: SingleUserComponent },
      { path: 'matches', component: MainPageComponent },
      { path: '', redirectTo: 'matches', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
