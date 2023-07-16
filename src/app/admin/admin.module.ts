import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { SharedModule } from '../shared/shared.module';
import { AppModule } from '../app.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectionList } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileComponent } from './profile/profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ExamComponent } from './exam/exam.component';
import { ExamDialogComponent } from './exam-dialog/exam-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { StudentExamComponent } from './student-exam/student-exam.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StudentsComponent } from './students/students.component';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { AddstudentDialogComponent } from './addstudent-dialog/addstudent-dialog.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddExamdialogComponent } from './add-examdialog/add-examdialog.component';
import { VolunteerExamComponent } from './volunteer-exam/volunteer-exam.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ExamComponent,
    ExamDialogComponent,
    ProfileComponent,
    StudentExamComponent,
    StudentsComponent,
    StudentDialogComponent,
    AddstudentDialogComponent,
    CalendarComponent,
    AddExamdialogComponent,
    VolunteerExamComponent,
  ],
  imports: [
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatOptionModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    CommonModule,
    NgxMaterialTimepickerModule,
    SharedModule,
    MatTooltipModule,
    MatStepperModule,
    AdminRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    CdkStepperModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSnackBarModule,
    MatMenuModule,
    MatAutocompleteModule,
  ],
  entryComponents: [ExamDialogComponent, StudentExamComponent],
})
export class AdminModule {}
