import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UsersServiceService } from 'src/app/users/users-service.service';
import { AdminService } from '../admin.service';
import { API } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.scss'],
})
export class StudentExamComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _httpClient: HttpClient,
    public dialog: MatDialog,
    private adser: AdminService,
    private snackBar: MatSnackBar
  ) {}

  isLoading: boolean = false;
  fetchstudents() {
    this.adser.getUnregisterdStudents(this.data).subscribe((response) => {
      console.log(response);
      this.filteredEligibleStudents = response.body.map((c) => ({
        name: c.name,
        rollno: c.rollno,
        id: c.id,
      }));
      this.eligibleStudents = response.body.map((c) => ({
        name: c.name,
        rollno: c.rollno,
        id: c.id,
      }));

      this.adser.getRegisterdStudents(this.data).subscribe((response) => {
        console.log(response);
        this.registeredStudents = response.body.map((c) => ({
          name: c.name,
          rollno: c.rollno,
          id: c.id,
        }));
        this.filteredSelectedStudents = response.body.map((c) => ({
          name: c.name,
          rollno: c.rollno,
          id: c.id,
        }));
      });
    });
  }
  //totals
  registeredStudents: Student[] = [];
  eligibleStudents: Student[] = [];

  //for filtering
  filterEligible = '';
  filteredEligibleStudents: Student[] = [];
  filterSelected = '';
  filteredSelectedStudents: Student[] = [];

  //highlighting
  toBeSelected: string[] = []; //array of rollno
  toBeRemoved: string[] = []; //array of rollno

  ngOnInit(): void {
    console.log(this.data); //examId
    //fetch list of registered students & eligibleStudents in the exam here..
    this.fetchstudents();
  }

  searchInEligible() {
    this.filteredEligibleStudents = this.eligibleStudents.filter(
      (student) =>
        student.name
          .toLowerCase()
          .startsWith(this.filterEligible.toLowerCase()) ||
        student.rollno
          .toLowerCase()
          .startsWith(this.filterEligible.toLowerCase())
    );
  }

  searchInSelected() {
    this.filteredSelectedStudents = this.registeredStudents.filter(
      (student) =>
        student.name
          .toLowerCase()
          .startsWith(this.filterSelected.toLowerCase()) ||
        student.rollno
          .toLowerCase()
          .startsWith(this.filterSelected.toLowerCase())
    );
  }

  handleClickEligible(student) {
    console.log(student);
    if (this.toBeSelected.includes(student))
      this.toBeSelected = this.toBeSelected.filter((x) => x != student);
    else this.toBeSelected = [...this.toBeSelected, student];
  }

  handleClickSelected(student) {
    if (this.toBeRemoved.includes(student))
      this.toBeRemoved = this.toBeRemoved.filter((x) => x != student);
    else this.toBeRemoved = [...this.toBeRemoved, student];
  }

  chooseStudents() {
    //transfer toBeSelected from eligible to registered
    let temp: Student[] = [];
    this.eligibleStudents = this.eligibleStudents.filter((student) => {
      if (this.toBeSelected.includes(student.rollno)) {
        temp.push(student);
        return false;
      }
      return true;
    });
    this.registeredStudents = [...this.registeredStudents, ...temp];
    console.log(this.eligibleStudents, this.registeredStudents);
    this.toBeSelected = [];
    this.filterEligible = '';
    this.filterSelected = '';
    this.searchInEligible();
    this.searchInSelected();
  }
  removeStudents() {
    //transfer toBeRemoved from registered to eligible
    let temp: Student[] = [];
    this.registeredStudents = this.registeredStudents.filter((student) => {
      if (this.toBeRemoved.includes(student.rollno)) {
        temp.push(student);
        return false;
      }
      return true;
    });
    this.eligibleStudents = [...this.eligibleStudents, ...temp];
    this.toBeRemoved = [];
    this.filterEligible = '';
    this.filterSelected = '';
    this.searchInEligible();
    this.searchInSelected();
  }

  update() {
    console.log(this.registeredStudents);
    const ids = this.registeredStudents.map((student) => student.id);
    const url = `${API}/registration/examstudents/${this.data}`;
    this._httpClient
      .post(url, { arr: ids }, { responseType: 'text' })
      .subscribe(
        (data) => {
          console.log(data);
          this.showSnackbar('Updated Successfully');
          this._httpClient
            .get(`${API}/registration/invite/${this.data}`, {
              responseType: 'text',
            })
            .subscribe(
              (res) => {
                console.log(res);
              },
              (err) => {
                console.log('error in email sending: ', err);
              }
            );
        },
        (error) => {
          console.log('error: ', error);
          this.showSnackbar('Some error occured');
        }
      );
  }

  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
}

export interface Student {
  name: string;
  rollno: string;
  id: string;
}
