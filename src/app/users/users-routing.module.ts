import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginRegisterComponent } from '../login-register/login-register.component';
import { UsersComponent } from './users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CalendarComponent } from './calendar/calendar.component';
import { VolunteerCheckinComponent } from './volunteer-checkin/volunteer-checkin.component';
import { ContactParentsComponent } from '../shared/contact-parents/contact-parents.component';
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: { title: 'Scribe Managment' },

    children: [
      {
        path: 'volunteer/checkin',
        component: VolunteerCheckinComponent,
      },
      {
        path: 'userpage',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'contact',
        component: ContactParentsComponent,
        data: { title: 'Scribe Management' },
      },
      {
        path: '**',
        redirectTo: 'userpage',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
