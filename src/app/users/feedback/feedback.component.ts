import { Component, OnInit } from '@angular/core';
import { API } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  feedback: string = '';
  ngOnInit(): void {}
  isLoading: boolean = false;
  submit() {
    this.isLoading = true;
    const url = `${API}/comment/add`;
    this.http
      .post<any>(url, this.feedback, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .subscribe(
        (res) => {
          this.showSnackbar('Feedback submitted successfully.');
          this.isLoading = false;
          this.feedback = '';
        },
        (err) => {
          console.log(err);
          this.showSnackbar('Some error occured!!');
          this.isLoading = false;
        }
      );
  }

  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }
}
