import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExamDialogComponent } from '../exam-dialog/exam-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { StudentExamComponent } from '../student-exam/student-exam.component';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { AddstudentDialogComponent } from '../addstudent-dialog/addstudent-dialog.component';
import { UsersServiceService } from 'src/app/users/users-service.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['S-No',  'Roll Number', 'Student-Name' ];
  data: Student[] = [];

  constructor(private _httpClient: HttpClient, public dialog: MatDialog,private adser:AdminService) {}

  ngOnInit(): void {
    this.fetchstudents();
  }

  addStudent() {
    this.dialog.open(AddstudentDialogComponent, {
      width: '60%',
      data: { type: 'add' },
    });
  }
  details(row) {
    this.dialog.open(StudentDialogComponent, {
      width: '60%',
      data: { type: 'edit', ...row },
    });
  }


  database: StudentDataSource | null;

  resultsLength = 0;
  isLoadingResults = true;
  errorOccured = false;

  ngAfterViewInit() {
    this.database = new StudentDataSource(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.database!.getstds(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.errorOccured = data === null;
          if (data === null) {
            return [];
          }
          this.resultsLength = data.total_count;
          return data.items;
        })
      )
      .subscribe((data) => (this.data = data));
  }

  fetchstudents(){

    this.adser.getStudents().subscribe((data)=>{
      this.data=data.body.map((c,index)=>{
        return{
          sno:index+1,
          name:c.name,
          rollno:c.rollno,
          id:c.id,
          address:c.address,
          fathername:c.fathername,
          mothername:c.mothername,
          parentemail:c.parentemail,
          phone:c.phone
        }
      })
      console.log(this.data);

    }
    )

  }
}


export interface StudentsList {
  items: Student[];
  total_count: number;
}

export interface Student {
  sno:Number;
  name: string;
  rollno: string;
  id:string,
  address:string,
  fathername:string,
  mothername:string,
  parentemail:string,
  phone:string
}

export class StudentDataSource {
  constructor(private _httpClient: HttpClient) {}

  stds: Student[] = [

  ];

  sampleReturn: StudentsList = {
    items: this.stds,
    total_count: 3,
  };

  getstds(
    sort: string,
    order: SortDirection,
    page: number
  ): Observable<StudentsList> {
    console.log(sort, order, page);
    return of(this.sampleReturn);
  }
}

