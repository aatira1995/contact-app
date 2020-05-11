import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "form",
    loadChildren:`./form/form.module#FormModule`
  },
  {
    path: "user",
    loadChildren: `./user/user.module#UserModule`
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
