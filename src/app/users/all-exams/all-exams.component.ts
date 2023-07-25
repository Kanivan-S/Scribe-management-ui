import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-all-exams',
  templateUrl: './all-exams.component.html',
  styleUrls: ['./all-exams.component.scss'],
})
export class AllExamsComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, public http: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    token: localStorage.getItem('token'),
  });

  sortConfig = {
    column: '',
    type: '',
  };

  displayedColumns = ['exam', 'date', 'action'];
  noExams: boolean = false;
  exams: Exam[] = [];
  sortedExams: Exam[] = [];
  ngOnInit(): void {
    this.http
      .get<any>(`${API}/admin/getexams`, { headers: this.headers })
      .subscribe(
        (response) => {
          console.log(response);
          response.forEach((item) => {
            this.exams = [
              ...this.exams,
              {
                examId: item.id,
                examName: item.name,
                examAddress: item.address,
                date: item.date,
              },
            ];
          });
          this.sortedExams = this.exams;
          this.noExams = this.exams.length === 0;
        },
        (err) => {
          console.log(err);
          this.showSnackbar('Error occured in fetching list of exams..');
        }
      );
    this.sortedExams = this.exams;
  }

  volunteer(examId) {
    console.log('volunteer for ', examId);
  }

  showSnackbar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }

  customSort(column) {
    console.log(column);
    if (this.sortConfig.column === column) {
      if (this.sortConfig.type === 'asc') {
        let temp = this.exams;
        temp.sort((a, b) => {
          if (typeof a[column] === 'string')
            return b[column].localeCompare(a[column]);
          return b[column] - a[column];
        });
        this.sortedExams = [...temp];
        this.sortConfig.type = 'desc';
      } else {
        this.sortedExams = this.exams;
        console.log(this.sortedExams);
        this.sortConfig = { column: '', type: '' };
      }
    } else {
      let temp = this.exams;
      temp.sort((a, b) => {
        if (typeof a[column] === 'string')
          return a[column].localeCompare(b[column]);
        return a[column] - b[column];
      });
      this.sortedExams = [...temp];
      this.sortConfig = { column: column, type: 'asc' };
    }
  }
}

export interface Exam {
  examId: number;
  examName: string;
  examAddress: string;
  date: Date;
}
