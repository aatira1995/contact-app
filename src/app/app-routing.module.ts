import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "form",
    loadChildren: () => import(`./form/form.module`)
        .then(module => module.FormModule)
  },
  {
    path: "user",
    loadChildren: () => import(`./user/user.module`)
        .then(module => module.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
