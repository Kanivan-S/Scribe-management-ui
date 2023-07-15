import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginRegisterComponent } from '../login-register/login-register.component';
import { UsersComponent } from './users.component';
import { VolunteerRegistrationComponent } from './volunteer-registration/volunteer-registration.component';
import { ProfileComponent } from './vol-profile/vol-profile.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes:Routes=[
  {
    path:'',
    component:UsersComponent,
    data:{title:'Scribe Managment'},

    children:[

      {
        path:'userpage',
        component:DashboardComponent,

      },
      {
        path:'volunteer-registration',
        component:VolunteerRegistrationComponent,

      },
      {
        path:'profile',
        component:ProfileComponent,

      },
      {
        path:'confirmation',
        component:ConfirmationComponent,

      },

      {
        path:"**",
        redirectTo:'userpage',

      }

    ]
  },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }




