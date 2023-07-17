import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API } from 'src/environments/environment';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './phone-dialog.component.html',
  styleUrls: ['./phone-dialog.component.scss'],
})
export class PhoneDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}
  parsedData: any[] = [];
  displayedColumns: string[] = ['student', 'phone', 'action'];
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
  showSnackbar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
}
