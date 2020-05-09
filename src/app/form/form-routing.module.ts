import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './form/form.component';
import { FormDataComponent } from './form-data/form-data.component';

const routes: Routes = [
    { path: '', component: FormComponent },
    { path: 'form-detail', component: FormDataComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }