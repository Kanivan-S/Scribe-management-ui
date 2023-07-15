import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AdminService} from '../admin.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  adminprofileform:FormGroup;
  hide :boolean= true;
  isEditMode: boolean = false;
  constructor(private router:Router,private route:ActivatedRoute,private adser:AdminService,private snackBar: MatSnackBar) {
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    const nameControl = this.adminprofileform.get('adminname');
    const emailControl=this.adminprofileform.get('adminemail');
    const admincontact=this.adminprofileform.get('admincontact');
    const adminpswd=this.adminprofileform.get('adminaddress');

    if (this.isEditMode) {
      nameControl.enable();
      emailControl.enable();
      admincontact.enable();
      adminpswd.enable();
    } else {
      nameControl.disable();
      emailControl.disable();
      admincontact.disable();
      adminpswd.disable();
    }
  }
 


  showSnackbar() {
    this.snackBar.open('Updated Successfully', 'Close', {
      duration: 3000, // Duration in milliseconds
    });
    this.toggleEditMode();
  }



  ngOnInit(): void {
    this.adminprofileform=new FormGroup({
      adminname:new FormControl({value:'AdminName',disabled: !this.isEditMode },[Validators.required]),
      adminemail:new FormControl({value:'admin@admin.com',disabled: !this.isEditMode}, [Validators.required, Validators.email]),
      admincontact:new FormControl({value:'+10 4412 0993 234',disabled: !this.isEditMode},[Validators.required]),
      adminpswd:new FormControl({value:'password',disabled: !this.isEditMode},[Validators.required]),
      adminaddress:new FormControl({value:'Admin Address Details',disabled: !this.isEditMode},[Validators.required])
    })

  }

}
