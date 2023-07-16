import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UsersServiceService } from 'src/app/users/users-service.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.scss'],
})
export class StudentExamComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _httpClient: HttpClient, public dialog: MatDialog,private adser:AdminService) {}

  isLoading:boolean=false;
  fetchstudents(){

    this.adser.getStudents().subscribe((data)=>{
      console.log(this.data);
      this.filteredEligibleStudents=data.body.map((c)=>{
        return{
          name:c.name,
          rollno:c.rollno,
          id:c.id
        }
      })
      this.eligibleStudents==data.body.map((c)=>{
        return{
          name:c.name,
          rollno:c.rollno,
          id:c.id
        }
      })
      // this.filteredEligibleStudents = this.eligibleStudents;
      console.log(this.filteredEligibleStudents);
    }
    )
  }
  //totals
  registeredStudents: Student[];
  eligibleStudents: Student[];

  //for filtering
  filterEligible = '';
  filteredEligibleStudents: Student[];
  filterSelected = '';
  filteredSelectedStudents: Student[];

  //highlighting
  toBeSelected: string[] = []; //array or rollno
  toBeRemoved: string[] = []; //array or rollno

  ngOnInit(): void {
    console.log(this.data); //examId
    //fetch list of registered students & eligibleStudents in the exam here..
    this.fetchstudents();
    this.filteredSelectedStudents= [];

  }

  searchInEligible() {
    this.filteredEligibleStudents = this.eligibleStudents.filter(
      (student) =>
        student.name
          .toLowerCase()
          .startsWith(this.filterEligible.toLowerCase()) ||
        student.rollNo
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
        student.rollNo
          .toLowerCase()
          .startsWith(this.filterSelected.toLowerCase())
    );
  }

  handleClickEligible(student) {
    if (this.toBeSelected.includes(student))
      this.toBeSelected = this.toBeSelected.filter((x) => x != student);
    else this.toBeSelected = [...this.toBeSelected, student];
  }

  handleClickSelected(student) {
    if (this.toBeRemoved.includes(student))
      this.toBeRemoved = this.toBeRemoved.filter((x) => x != student);
    else this.toBeRemoved = [...this.toBeRemoved, student];
  }

  selectStudents() {
    //transfer toBeSelected from eligible to registered
    let temp: Student[] = [];
    this.eligibleStudents = this.eligibleStudents.filter((student) => {
      if (this.toBeSelected.includes(student.rollNo)) {
        temp.push(student);
        return false;
      }
      return true;
    });
    this.registeredStudents = [...this.registeredStudents, ...temp];
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
      if (this.toBeRemoved.includes(student.rollNo)) {
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
    //api call here..
  }
}

export interface Student {
  name: string;
  rollNo: string;
  id:string;
}
