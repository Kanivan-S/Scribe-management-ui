import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { AddstudentDialogComponent } from '../addstudent-dialog/addstudent-dialog.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['S-No', 'Roll Number', 'Student-Name'];
  data: Student[] = [];

  constructor(
    private _httpClient: HttpClient,
    public dialog: MatDialog,
    private adser: AdminService
  ) {}

  ngOnInit(): void {
    this.fetchstudents();
  }

  addStudent() {
    this.dialog.open(AddstudentDialogComponent, {
      width: '60%',
      data: { type: 'add' },
    });
  }
  details(row) {
    this.dialog.open(StudentDialogComponent, {
      width: '60%',
      data: { type: 'edit', ...row },
    });
  }

  resultsLength = 0;
  isLoadingResults = true;
  errorOccured = false;

  fetchstudents() {
    this.adser.getStudents().subscribe(
      (data) => {
        this.data = data.body.map((c, index) => {
          return {
            sno: index + 1,
            name: c.name,
            rollno: c.rollno,
            id: c.id,
            address: c.address,
            fathername: c.fathername,
            mothername: c.mothername,
            parentemail: c.parentemail,
            phone: c.phone,
          };
        });
        this.resultsLength = this.data.length;
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

export interface StudentsList {
  items: Student[];
  total_count: number;
}

export interface Student {
  sno: Number;
  name: string;
  rollno: string;
  id: string;
  address: string;
  fathername: string;
  mothername: string;
  parentemail: string;
  phone: string;
}
