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
import { AddExamdialogComponent } from '../add-examdialog/add-examdialog.component';
import { UsersServiceService } from 'src/app/users/users-service.service';
import { AdminService } from '../admin.service';
import { VolunteerExamComponent } from '../volunteer-exam/volunteer-exam.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  examslist: Exam[] = [];
  constructor(
    private _httpClient: HttpClient,
    public dialog: MatDialog,
    private adser: AdminService,
    private snackBar: MatSnackBar
  ) {}

  fectchExamlist() {
    this.adser.getExamlist().subscribe(
      (data) => {
        this.data = data.body;
      },
      (err) => {
        console.log('error in fetching exam list: ', err);
        this.showSnackbar('Error in fetching exam list!');
      }
    );
  }

  ngOnInit(): void {
    this.fectchExamlist();
    // console.log(this.examslist);
  }
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
    this.dialog.open(AddExamdialogComponent, {
      width: '80%',
      data: { type: 'add' },
    });
  }

  volunteers(row) {
    this.dialog.open(VolunteerExamComponent, {
      width: '85%',
      data: row.id,
    });
  }

  displayedColumns: string[] = ['exam-date', 'exam-name', 'desc', 'city'];
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
  showSnackbar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
}

export interface Exams {
  items: Exam[];
  total_count: number;
}

export interface Exam {
  sno: number;
  id: string;
  name: string;
  desc: string;
  address: string;
  date: Date;
  city: string;
  state: string;
  postalcode: string;
}

export class ExamDataSource {
  constructor(private _httpClient: HttpClient) {}

  exams: Exam[] = [];

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
