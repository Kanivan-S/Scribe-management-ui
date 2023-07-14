import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
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
      }
    ]
  },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }




