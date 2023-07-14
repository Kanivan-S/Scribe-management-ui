import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { UsersServiceService } from '../users-service.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userprofileform:FormGroup;
  hide :boolean= true;
  isEditMode: boolean = false;
  constructor(private router:Router,private route:ActivatedRoute,private adser:UsersServiceService,private snackBar: MatSnackBar) {
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    const nameControl = this.userprofileform.get('username');
    const emailControl=this.userprofileform.get('useremail');
    const usercontact=this.userprofileform.get('usercontact');
    const userpswd=this.userprofileform.get('useraddress');

    if (this.isEditMode) {
      nameControl.enable();
      emailControl.enable();
      usercontact.enable();
      userpswd.enable();
    } else {
      nameControl.disable();
      emailControl.disable();
      usercontact.disable();
      userpswd.disable();
    }
  }



  showSnackbar() {
    this.snackBar.open('Updated Successfully', 'Close', {
      duration: 3000, // Duration in milliseconds
    });
    this.toggleEditMode();
  }



  ngOnInit(): void {
    this.userprofileform=new FormGroup({
      username:new FormControl({value:'UserName',disabled: !this.isEditMode },[Validators.required]),
      useremail:new FormControl({value:'user@user.com',disabled: !this.isEditMode}, [Validators.required, Validators.email]),
      usercontact:new FormControl({value:'+10 4412 0993 234',disabled: !this.isEditMode},[Validators.required]),
      userpswd:new FormControl({value:'password',disabled: !this.isEditMode},[Validators.required]),
      useraddress:new FormControl({value:'User Address Details',disabled: !this.isEditMode},[Validators.required])
    })

  }


}
