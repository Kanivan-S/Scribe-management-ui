import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamComponent } from './exam/exam.component';
import { StudentExamComponent } from './student-exam/student-exam.component';
import { StudentsComponent } from './students/students.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactParentsComponent } from '../shared/contact-parents/contact-parents.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { title: 'Scribe Management' },

    children: [
      {
        path: '',
        redirectTo: 'students',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Scribe Management-Admin' },
      },
      {
        path: 'exam',
        component: ExamComponent,
        data: { title: 'Scribe Management' },
      },
      {
        path: 'students',
        component: StudentsComponent,
        data: { title: 'Scribe Management' },
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        data: { title: 'Scribe Management' },
      },
      {
        path: 'contact',
        component: ContactParentsComponent,
        data: { title: 'Scribe Management' },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
