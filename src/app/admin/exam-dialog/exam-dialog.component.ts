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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exam } from '../exam/exam.component';
@Component({
  selector: 'app-exam-dialog',
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.scss'],
})
export class ExamDialogComponent implements OnInit {
  examform: FormGroup;
  exam: Exam;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private adser: AdminService
  ) {
    this.exam = data;
    console.log(this.exam);
    console.log(this.exam.name);
    this.examform = new FormGroup({
      name: new FormControl(this.exam.name, [Validators.required]),
      desc: new FormControl(this.exam.desc, [Validators.required]),
      date: new FormControl(this.exam.date, [Validators.required]),
      city: new FormControl(this.exam.city, [Validators.required]),
      address: new FormControl(this.exam.address, [Validators.required]),
      state: new FormControl(this.exam.state, [Validators.required]),
      postalcode: new FormControl(this.exam.postalcode, [Validators.required]),
    });
  }
  ngOnInit(): void {}
}
