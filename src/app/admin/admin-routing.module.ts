import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamComponent } from './exam/exam.component';
const routes:Routes=[
  {
    path:'',
    component:AdminComponent,
    data:{title:'Scribe Management'},

    children:[
      {
        path:'',
        redirectTo:'adminpage',
      },
      {
        path: 'adminpage',
        component: DashboardComponent,
        data: { title: 'Scribe Management' },
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
      }
    ]
  },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }



