import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss'],
})
export class AddExamComponent implements OnInit {
  constructor() {}
  examDetails = {
    name: '',
    dateTime: '',
    venue: '',
    city: '',
    state: '',
    zip: '',
  };
  ngOnInit(): void {
    //fetch details here...
  }
  add() {
    console.log(this.examDetails);
    //api call here...
  }
}
