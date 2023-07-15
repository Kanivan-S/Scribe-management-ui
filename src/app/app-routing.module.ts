import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { UsersComponent } from './users/users.component';
import { VolunteerRegistrationComponent } from './users/volunteer-registration/volunteer-registration.component';
import { ProfileComponent } from './users/vol-profile/vol-profile.component';

const routes: Routes = [
  { path: 'alogin', component: LoginRegisterComponent },
  { path: 'login', component: LoginRegisterComponent },
  {
    path: 'admin',
    canActivate: [RoleGuard],
    loadChildren: () => import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./users/users.module').then((mod) => mod.UsersModule),
  },
  { path: 'volunteer-registration', component: VolunteerRegistrationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:volunteerId', component: ProfileComponent }, // Add the profile route with the volunteerId parameter
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
