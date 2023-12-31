import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API } from 'src/environments/environment';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss'],
})
export class EmailDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'token': localStorage.getItem('token'),
  });
  parsedData: any[] = [];
  selectedIds = [];
  subject: string = '';
  body: string = '';
  displayedColumns: string[] = ['student', 'email', 'action'];
  ngOnInit(): void {
    let user = 'admin';
    // console.log(typeof localStorage.getItem('isUser'));
    if (localStorage.getItem('isUser') === 'true') {
      user = localStorage.getItem('id');
    }
    const url = `${API}/students/getstudents`;
    this.http
      .get<any>(url, {
        headers: {
          'Content-Type': 'application/json',
          token:localStorage.getItem('token'),
          user: user
        },
      })
      .subscribe(
        (response) => {
          console.log(response);
          response.forEach((student) => {
            this.parsedData = [
              ...this.parsedData,
              {
                id: student.id,
                name: student.name,
                rollno: student.rollno,
                phone: student.phone,
                email: student.parentemail,
              },
            ];
          });
        },
        (err) => {
          console.log(err);
          this.showSnackbar('Error in fetching details of students.');
        }
      );
  }
  select(id) {
    if (this.selectedIds.includes(id))
      this.selectedIds = this.selectedIds.filter((x) => x != id);
    else this.selectedIds = [...this.selectedIds, id];
    console.log(this.selectedIds);
  }

  send() {
    let type =
      localStorage.getItem('isUser') === 'false' ? 'admin' : 'volunteer';
    const url = `${API}/exams/sendemailtoparent`;
    const options: Object = {
      headers: {
        type: type,
        token:localStorage.getItem("token"),
        id: localStorage.getItem('id'),
      },
      responseType: 'text',
    };
    this.http
      .post<any>(
        url,
        { token:localStorage.getItem('token'), arr: this.selectedIds, subject: this.subject, body: this.body },
        options
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.showSnackbar(response);
        },
        (err) => {
          console.log(err);
          this.showSnackbar('Error in sending mail');
        }
      );
    console.log(this.subject, this.body, this.selectedIds);
  }
  showSnackbar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
}
