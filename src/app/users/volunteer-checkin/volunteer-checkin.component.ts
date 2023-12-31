import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-volunteer-checkin',
  templateUrl: './volunteer-checkin.component.html',
  styleUrls: ['./volunteer-checkin.component.scss'],
})
export class VolunteerCheckinComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    token: localStorage.getItem('token'),
  });
  examId: string;
  loading: boolean = true;
  volId: string;
  exam: any;
  ngOnInit(): void {
    if (
      !localStorage.getItem('token') ||
      localStorage.getItem('isUser') === 'false'
    ) {
      window.alert('Login first!!');
      this.router.navigateByUrl('/');
      return;
    }
    this.route.queryParams.subscribe((params) => {
      this.examId = params.examId;
      this.volId = params.volId;
      this.httpClient
        .get(`${API}/exams/getexam/${this.examId}`, { headers: this.headers })
        .subscribe(
          (response) => {
            console.log(response);
            this.exam = response;
            this.exam.date =
              new Date(Date.parse(this.exam.date)).toLocaleDateString() +
              ' at ' +
              new Date(Date.parse(this.exam.date)).toLocaleTimeString();
            this.loading = false;
          },
          (err) => {
            console.log('error in fetching exam: ', err);
            this.showSnackbar('error in fetching exam details');
            this.loading = false;
          }
        );
    });
  }
  showSnackbar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
  accept() {
    this.httpClient
      .get(`${API}/registration/accept/${this.volId}/${this.examId}`, {
        headers: this.headers,
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          this.showSnackbar(response);
          this.router.navigateByUrl('/user/calendar');
        },
        (err) => {
          console.log('error in accepting: ', err);
          this.showSnackbar('Some error occured. Try again later!!');
        }
      );
  }
  reject() {
    this.httpClient
      .get(`${API}/registration/reject/${this.volId}`, {
        headers: this.headers,
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          this.showSnackbar('Rejected Successfully');
          this.router.navigateByUrl('/user');
        },
        (err) => {
          console.log('error in rejecting: ', err);
          this.showSnackbar('Some error occured. Try again later!!');
        }
      );
  }
}
