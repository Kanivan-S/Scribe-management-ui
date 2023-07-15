import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exam-dialog',
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.scss'],
})
export class ExamDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  title = '';
  examDetails = {
    id: '',
    name: '',
    dateTime: new Date(Date.now()).toDateString(),
    venue: '',
    city: '',
    state: '',
    zip: '',
  };
  originalDate = null;
  noOfStudents = 0;
  ngOnInit(): void {
    console.log(this.data);
    if (this.data.type === 'add') {
      this.title = 'Add';
    } else if (this.data.type === 'edit') {
      this.title = 'Edit';
      this.examDetails.name = this.data.name;
      this.examDetails.id = this.data.id;
      this.noOfStudents = this.data.noOfStudents;
      this.examDetails.venue = this.data.venue;
      this.examDetails.city = this.data.city;
      this.examDetails.state = this.data.state;
      this.examDetails.zip = this.data.postalCode;
      this.originalDate =
        new Date(Date.parse(this.data.date)).toLocaleDateString() +
        ' at ' +
        new Date(Date.parse(this.data.date)).toLocaleTimeString();
    }
    //fetch details here...
  }
  add() {
    console.log(this.examDetails);
    //api call here...
  }
}
