import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExamDialogComponent } from '../exam-dialog/exam-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, of as observableOf, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { StudentExamComponent } from '../student-exam/student-exam.component';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {}
  details(exam) {
    this.dialog.open(ExamDialogComponent, {
      width: '80%',
      data: { type: 'edit', ...exam },
    });
  }
  students(row) {
    this.dialog.open(StudentExamComponent, {
      width: '85%',
      data: row.id,
    });
  }
  addExam() {
    this.dialog.open(ExamDialogComponent, {
      width: '80%',
      data: { type: 'add' },
    });
  }

  displayedColumns: string[] = ['exam-date', 'exam-name', 'venue', 'students'];
  database: ExamDataSource | null;
  data: Exams[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  errorOccured = false;

  ngAfterViewInit() {
    this.database = new ExamDataSource(this._httpClient);

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

export interface Exams {
  items: Exam[];
  total_count: number;
}

export interface Exam {
  id: string;
  date: Date;
  name: string;
  venue: string;
  noOfStudents: number;
  city: string;
  state: string;
  postalCode: string;
}

export class ExamDataSource {
  constructor(private _httpClient: HttpClient) {}

  exams: Exam[] = [
    {
      id: 'xyz',
      name: 'first name',
      date: new Date(Date.now()),
      venue: 'TD College',
      noOfStudents: 34,
      city: 'ballia',
      state: 'UP',
      postalCode: '277405',
    },
    {
      id: 'abc',
      name: 'second name',
      date: new Date(Date.now()),
      venue: 'SVBH Degree College',
      noOfStudents: 29,
      city: 'Chhapra',
      state: 'Bihar',
      postalCode: '288900',
    },
    {
      id: 'pqr',
      name: 'third name',
      date: new Date(Date.now()),
      venue: 'Little Flower School',
      noOfStudents: 45,
      city: 'ballia',
      state: 'UP',
      postalCode: '277405',
    },
  ];

  sampleReturn: Exams = {
    items: this.exams,
    total_count: 3,
  };

  getExams(
    sort: string,
    order: SortDirection,
    page: number
  ): Observable<Exams> {
    console.log(sort, order, page);
    //return sorted result from backend...
    return of(this.sampleReturn);
    // return this._httpClient.get<Exams>(requestUrl);
  }
}
