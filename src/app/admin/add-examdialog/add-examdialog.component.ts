import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-examdialog',
  templateUrl: './add-examdialog.component.html',
  styleUrls: ['./add-examdialog.component.scss'],
})
export class AddExamdialogComponent implements OnInit {
  examform: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private adser: AdminService
  ) {
    this.examform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postalcode: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    // console.log(this.data);
    // if (this.data.type === 'add') {
    //   this.title = 'Add';
    // } else if (this.data.type === 'edit') {
    //   this.title = 'Edit';
    //   this.examDetails.name = this.data.name;
    //   this.examDetails.id = this.data.id;
    //   this.noOfStudents = this.data.noOfStudents;
    //   this.examDetails.venue = this.data.venue;
    //   this.examDetails.city = this.data.city;
    //   this.examDetails.state = this.data.state;
    //   this.examDetails.zip = this.data.postalCode;
    //   this.originalDate =
    //     new Date(Date.parse(this.data.date)).toLocaleDateString() +
    //     ' at ' +
    //     new Date(Date.parse(this.data.date)).toLocaleTimeString();
    // }
    //fetch details here...
  }
  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
  add() {
    const formJson = JSON.stringify({
      name: this.examform.get('name').value,
      desc: this.examform.get('desc').value,
      address: this.examform.get('address').value,
      date: this.examform.get('date').value,
      city: this.examform.get('city').value,
      state: this.examform.get('state').value,
      postalcode: this.examform.get('postalcode').value,
    });

    console.log(formJson);

    this.adser.addExam(formJson).subscribe(
      (data) => {
        this.showSnackbar('Added Successfully');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      },
      (err) => {
        this.showSnackbar('Error in adding exam details\n');
      }
    );
  }
}
