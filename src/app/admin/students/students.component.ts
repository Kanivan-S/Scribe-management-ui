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

  constructor(private _httpClient: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  addStudent() {
    this.dialog.open(AddstudentDialogComponent, {
      width: '60%',
      data: { type: 'add' },
    });
  }
  details(exam) {
    this.dialog.open(StudentDialogComponent, {
      width: '60%',
      data: { type: 'edit', ...exam },
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
          return this.database!.getExams(
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
}


export interface StudentsList {
  items: Student[];
  total_count: number;
}

export interface Student {
  sno:Number;
  name: string;
  rollnum: string;
}

export class StudentDataSource {
  constructor(private _httpClient: HttpClient) {}

  exams: Student[] = [
    {
      sno:1,
      name: "1string",
      rollnum: "2string",
    },
    {
      sno:2,
      name: "2string",
      rollnum: "2string",
    },
    {
      sno:3,
      name: "3string",
      rollnum: "3string",
    },
  ];

  sampleReturn: StudentsList = {
    items: this.exams,
    total_count: 3,
  };

  getExams(
    sort: string,
    order: SortDirection,
    page: number
  ): Observable<StudentsList> {
    console.log(sort, order, page);
    //return sorted result from backend...
    return of(this.sampleReturn);
    // return this._httpClient.get<Exams>(requestUrl);
  }
}

