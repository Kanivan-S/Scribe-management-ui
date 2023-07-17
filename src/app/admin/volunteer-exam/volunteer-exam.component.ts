import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API } from 'src/environments/environment';

@Component({
  selector: 'app-volunteer-exam',
  templateUrl: './volunteer-exam.component.html',
  styleUrls: ['./volunteer-exam.component.scss'],
})
export class VolunteerExamComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public httpClient: HttpClient,
    public snackBar: MatSnackBar
  ) {}

  // options: string[] = [];
  // filteredOptions: string[][] = [];
  // volFilter: string[] = [];

  emptyMapped: boolean = false;
  emptyUnMapped: boolean = false;

  loading: boolean = false;
  mappings: any[] = [];
  unMappedStudents: any[] = [];
  displayedColumns: string[] = ['student', 'volunteer']; //, 'actions'];
  unMappedColumns: string[] = ['student']; //, 'mapTo', 'mapRandom'];
  ngOnInit(): void {
    this.httpClient
      .get<any>(`${API}/admin/getregistrationexams/${this.data}`)
      .subscribe(
        (res) => {
          res.forEach((val) => {
            if (val.volunteer !== null) {
              this.mappings = [
                ...this.mappings,
                {
                  stId: val.student.id,
                  stName: val.student.name,
                  stRoll: val.student.rollno,
                  volId: val.volunteer.id,
                  volName: val.volunteer.name,
                  examId: val.exam.id,
                },
              ];
            } else {
              this.unMappedStudents = [
                ...this.unMappedStudents,
                {
                  stId: val.student.id,
                  stName: val.student.name,
                  stRoll: val.student.rollno,
                  examId: val.exam.id,
                },
              ];
            }
          });
          if (!this.mappings.length) this.emptyMapped = true;
          if (!this.unMappedStudents.length) this.emptyUnMapped = true;
        },
        (err) => {
          console.log('error in fetching list: ', err);
          this.showSnackbar('Error in fetching list.');
        }
      );
  }

  showSnackbar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
  // filterVolunteers(i) {
  //   this.filteredOptions[i] = this.options.filter((vol) =>
  //     vol.toLowerCase().includes(this.volFilter[i].toLowerCase())
  //   );
  // }

  // deleteMapping(id) {
  //   console.log('delete: ', id);
  //   this.loading = true;
  //   setTimeout(() => (this.loading = false), 2000);
  //   //api call here..
  // }

  // mapAll() {
  //   //map all possible students randomly...
  //   console.log('map all...');
  //   this.loading = true;
  //   setTimeout(() => (this.loading = false), 2000);
  // }

  // mapTo(rollNo, volunteer) {
  //   const volId = volunteer.toString().split('|').at(-1).trim();
  //   //check for availability and map
  //   console.log(rollNo, volId);
  // }
  // mapRandom(rollNo) {
  //   console.log(rollNo, 'random');
  // }
}
