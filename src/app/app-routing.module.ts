import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { UsersComponent } from './users/users.component';
import { NgoLandingPageComponent } from './ngo-landing-page/ngo-landing-page.component';

const routes: Routes = [
  {path:'alogin',component:LoginRegisterComponent},

  { path: 'login', component:LoginRegisterComponent },
  {
    path: 'admin',
    // canActivate:[RoleGuard,AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),

  },
  {
    path:'user',
    // canActivate:[RoleGuard,AuthGuard],
    loadChildren: () =>
      import('./users/users.module').then((mod) => mod.UsersModule),
  },
  {
    path:'**',
    component:NgoLandingPageComponent,
    data:{title:"CSR-Hackathon"}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
