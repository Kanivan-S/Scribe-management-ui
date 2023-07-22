import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExamDialogComponent } from '../exam-dialog/exam-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatMenuTrigger } from '@angular/material/menu';
import { StudentExamComponent } from '../student-exam/student-exam.component';
import { AddExamdialogComponent } from '../add-examdialog/add-examdialog.component';
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
  examslist: Exam[] = [];
  constructor(
    private _httpClient: HttpClient,
    public dialog: MatDialog,
    private adser: AdminService,
    private snackBar: MatSnackBar
  ) {}

  isLoadingResults = true;

  fectchExamlist() {
    this.adser.getExamlist().subscribe(
      (data) => {
        this.data = data.body;
        this.resultsLength = this.data.length;
        this.isLoadingResults = false;
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
  data: Exams[] = [];

  resultsLength = 0;
  errorOccured = false;

  showSnackbar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
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
