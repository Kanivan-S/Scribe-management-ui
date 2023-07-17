import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
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
  parsedData: any[] = [];
  selectedIds = [];
  subject: string = '';
  body: string = '';
  displayedColumns: string[] = ['student', 'email', 'action'];
  ngOnInit(): void {
    let user = 'admin';
    if (localStorage.getItem('userType') !== 'admin') {
      user = localStorage.getItem('id');
    }
    const url = `${API}/students/getstudents`;
    this.http
      .get<any>(url, {
        headers: {
          user: user,
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
    let type = localStorage.getItem('userType');
    if (!type) type = 'volunteer';
    const url = `${API}/exams/sendemailtoparent`;
    const options: Object = {
      headers: {
        type: type,
        id: localStorage.getItem('id'),
      },
      responseType: 'text',
    };
    this.http
      .post<any>(
        url,
        { arr: this.selectedIds, subject: this.subject, body: this.body },
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
