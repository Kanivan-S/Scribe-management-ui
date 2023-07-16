import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AdminService} from '../admin.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent implements OnInit {

  //to show student details
  stdprofileform:FormGroup;
  isEditMode: boolean = false;
  constructor(private router:Router,private route:ActivatedRoute,private adser:AdminService,private snackBar: MatSnackBar) {
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    const nameControl = this.stdprofileform.get('stdname');
    const emailControl=this.stdprofileform.get('stdemail');
    const stdcontact=this.stdprofileform.get('stdcontact');

    const stdfathername=this.stdprofileform.get('stdfathername');
    const stdmothername=this.stdprofileform.get('stdfathername');
    const stdrollnum=this.stdprofileform.get('stdrollnum');

    if (this.isEditMode) {
      stdrollnum.enable();
      nameControl.enable();
      emailControl.enable();
      stdcontact.enable();
      stdfathername.enable();
      stdmothername.enable();
    } else {
      stdrollnum.disable();
      nameControl.disable();
      emailControl.disable();
      stdcontact.disable();
      stdfathername.disable();
      stdmothername.disable();
    }
  }



  showSnackbar() {
    this.snackBar.open('Updated Successfully', 'Close', {
      duration: 3000, // Duration in milliseconds
    });
    this.toggleEditMode();
  }



  ngOnInit(): void {
    this.stdprofileform=new FormGroup({
      stdrollnum:new FormControl({value:'2020110233',disabled: !this.isEditMode },[Validators.required]),
      stdname:new FormControl({value:'stdName',disabled: !this.isEditMode },[Validators.required]),
      stdemail:new FormControl({value:'std@std.com',disabled: !this.isEditMode}, [Validators.required, Validators.email]),
      stdcontact:new FormControl({value:'+10 4412 0993 234',disabled: !this.isEditMode},[Validators.required]),
      stdaddress:new FormControl({value:'std Address Details',disabled: !this.isEditMode},[Validators.required]),
      stdfathername:new FormControl({value:'Father name',disabled: !this.isEditMode},[Validators.required]),
      stdmothername:new FormControl({value:'Mother name',disabled: !this.isEditMode},[Validators.required]),

    })

  }

}
