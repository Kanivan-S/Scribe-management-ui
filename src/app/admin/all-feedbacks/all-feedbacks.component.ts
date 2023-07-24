import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-feedbacks',
  templateUrl: './all-feedbacks.component.html',
  styleUrls: ['./all-feedbacks.component.scss'],
})
export class AllFeedbacksComponent implements OnInit {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  isLoadingResults = true;
  sortConfig = {
    column: '',
    type: '',
  };
  feedbacks = [];
  sortedFeedbacks = [];
  displayedColumns = ['message', 'volunteer', 'sentiment'];
  ngOnInit(): void {
    this.http
      .get<any>(`${API}/comment/gettotal`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .subscribe(
        (res) => {
          if (!res) {
            console.log('no comments found');
            return;
          }
          this.feedbacks = res.result.map((feedback) => ({
            id: feedback.id,
            message: feedback.message,
            volunteer: feedback.volunteer.name,
            sentiment: feedback.sentiment,
          }));
          this.sortedFeedbacks = [...this.feedbacks];
          this.isLoadingResults = false;
          console.log(res);
        },
        (err) => {
          console.log(err);
          this.isLoadingResults = false;
          this.showSnackbar('Error in fetching feedbacks..');
        }
      );
  }
  customSort(column) {
    console.log(column);
    if (this.sortConfig.column === column) {
      if (this.sortConfig.type === 'asc') {
        let temp = this.feedbacks;
        temp.sort((a, b) => {
          if (typeof a[column] === 'string')
            return b[column].localeCompare(a[column]);
          return b[column] - a[column];
        });
        this.sortedFeedbacks = [...temp];
        this.sortConfig.type = 'desc';
      } else {
        this.sortedFeedbacks = this.feedbacks;
        this.sortConfig = { column: '', type: '' };
      }
    } else {
      let temp = this.feedbacks;
      temp.sort((a, b) => {
        if (typeof a[column] === 'string')
          return a[column].localeCompare(b[column]);
        return a[column] - b[column];
      });
      this.sortedFeedbacks = [...temp];
      this.sortConfig = { column: column, type: 'asc' };
    }
  }
  showSnackbar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }
}
