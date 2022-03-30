import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditQuotationPage } from './edit-quotation.page';

const routes: Routes = [
  {
    path: '',
    component: EditQuotationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditQuotationPageRoutingModule {}
