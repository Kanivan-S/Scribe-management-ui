import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, public http: HttpClient) {}

  displayedColumns = ['exam', 'student', 'date', 'action'];
  noExams: boolean = false;
  exams: Exam[] = [];
  ngOnInit(): void {
    const vId = localStorage.getItem('id');
    this.http.get<any>(`${API}/volunteer/volunteeredexams/${vId}`).subscribe(
      (response) => {
        console.log(response);
        response.forEach((item) => {
          this.exams = [
            ...this.exams,
            {
              examId: item.exam.id,
              examName: item.exam.name,
              examAddress: item.exam.address,
              stName: item.student.name,
              stRoll: item.student.rollno,
              stId: item.student.id,
              date: item.exam.date,
              volId: item.volunteer.id,
            },
          ];
        });
        this.noExams = this.exams.length === 0;
      },
      (err) => {
        console.log(err);
        this.showSnackbar('Error occured in fetching list of exams..');
      }
    );
  }

  cancelScheduled(examId) {
    console.log(examId);
  }
  showSnackbar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
}

export interface Exam {
  examId: number;
  examName: string;
  examAddress: string;
  stName: string;
  stRoll: string;
  stId: string;
  date: Date;
  volId: string;
}
