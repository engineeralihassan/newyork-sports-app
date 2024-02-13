import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleFormPage } from './example-form.page';

const routes: Routes = [
  {
    path: '',
    component: ExampleFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExampleFormPageRoutingModule {}
