import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student, VolunteerStudentMapping, Volunteer } from '../model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-volunteer-exam',
  templateUrl: './volunteer-exam.component.html',
  styleUrls: ['./volunteer-exam.component.scss'],
})
export class VolunteerExamComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  options: string[] = [];
  filteredOptions: string[][] = [];
  volFilter: string[] = [];

  loading: boolean = false;
  mappings: VolunteerStudentMapping[] = [];
  unMappedStudents: Student[] = [];
  unMappedVolunteers: Volunteer[] = [];
  displayedColumns: string[] = ['student', 'volunteer', 'actions'];
  unMappedColumns: string[] = ['student', 'mapTo', 'mapRandom'];
  ngOnInit(): void {
    //fetch list of unmapped volunteers & students, and mappings here...
    console.log(this.data);

    this.mappings = [
      {
        mapId: 'z',
        examId: 'xyz',
        volId: '123',
        stId: '4041',
        examName: 'Semester I',
        volName: 'Ankur',
        stName: 'Ashish',
      },
      {
        mapId: 'x',
        examId: 'xyz',
        volId: '243',
        stId: '4154',
        examName: 'Semester I',
        volName: 'Aaakash',
        stName: 'Vipul',
      },
      {
        mapId: 'v',
        examId: 'xyz',
        volId: '154',
        stId: '8069',
        examName: 'Semester I',
        volName: 'Balaji',
        stName: 'Navaneeth',
      },
      {
        mapId: 'c',
        examId: 'xyz',
        volId: '334',
        stId: '4113',
        examName: 'Semester I',
        volName: 'Ramesh',
        stName: 'Rajesh',
      },
    ];

    this.unMappedStudents = [
      {
        rollNo: '2014',
        name: 'Prem',
        section: 'B',
        class: 'Nursery',
      },
      {
        rollNo: '2016',
        name: 'Ayush',
        section: 'A',
        class: 'Nursery',
      },
      {
        rollNo: '3025',
        name: 'Priyanshu',
        section: 'B',
        class: 'LKG',
      },
    ];

    this.unMappedVolunteers = [
      {
        volId: '123A',
        volName: 'Ravi',
      },
      {
        volId: '443B',
        volName: 'Padma',
      },
    ];
    this.options = this.unMappedVolunteers.map(
      (vol) => `${vol.volName} | ${vol.volId}`
    );
    this.unMappedStudents.forEach((st) => {
      this.filteredOptions = [...this.filteredOptions, this.options];
      this.volFilter = [...this.volFilter, ''];
    });
  }

  filterVolunteers(i) {
    this.filteredOptions[i] = this.options.filter((vol) =>
      vol.toLowerCase().includes(this.volFilter[i].toLowerCase())
    );
  }

  deleteMapping(id) {
    console.log('delete: ', id);
    this.loading = true;
    setTimeout(() => (this.loading = false), 2000);
    //api call here..
  }

  mapAll() {
    //map all possible students randomly...
    console.log('map all...');
    this.loading = true;
    setTimeout(() => (this.loading = false), 2000);
  }

  mapTo(rollNo, volunteer) {
    const volId = volunteer.toString().split('|').at(-1).trim();
    //check for availability and map
    console.log(rollNo, volId);
  }
  mapRandom(rollNo) {
    console.log(rollNo, 'random');
  }
}
