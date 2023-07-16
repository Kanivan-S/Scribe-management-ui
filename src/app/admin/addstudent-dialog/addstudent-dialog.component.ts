import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AdminService} from '../admin.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addstudent-dialog',
  templateUrl: './addstudent-dialog.component.html',
  styleUrls: ['./addstudent-dialog.component.scss']
})
export class AddstudentDialogComponent implements OnInit {
 //to show student details
 stdprofileform:FormGroup;
 constructor(private router:Router,private route:ActivatedRoute,private adser:AdminService,private snackBar: MatSnackBar) {
  this.stdprofileform=new FormGroup({
    stdrollnum:new FormControl('',[Validators.required]),
    stdname:new FormControl('',[Validators.required]),
    stdemail:new FormControl('', [Validators.required, Validators.email]),
    stdcontact:new FormControl('',[Validators.required]),
    stdaddress:new FormControl('',[Validators.required]),
    stdfathername:new FormControl('',[Validators.required]),
    stdmothername:new FormControl('',[Validators.required]),

  })
 }




 showSnackbar() {
   this.snackBar.open('Updated Successfully', 'Close', {
     duration: 3000, // Duration in milliseconds
   });

 }



 ngOnInit(): void {


 }


}
