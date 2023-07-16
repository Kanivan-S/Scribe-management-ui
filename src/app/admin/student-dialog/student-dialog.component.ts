import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AdminService} from '../admin.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Student} from '../students/students.component';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent implements OnInit {

  //to show student details
  stdprofileform:FormGroup;
  isEditMode: boolean = false;
  stdprofile:Student;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router:Router,private route:ActivatedRoute,private adser:AdminService,private snackBar: MatSnackBar) {
    this.stdprofile=data;
    console.log(this.stdprofile);
    this.stdprofileform=new FormGroup({
      stdrollnum:new FormControl({value:this.stdprofile["rollno"],disabled: !this.isEditMode },[Validators.required]),
      stdname:new FormControl({value:this.stdprofile["name"],disabled: !this.isEditMode },[Validators.required]),
      stdemail:new FormControl({value:this.stdprofile["parentemail"],disabled: !this.isEditMode}, [Validators.required, Validators.email]),
      stdcontact:new FormControl({value:this.stdprofile["phone"],disabled: !this.isEditMode},[Validators.required]),
      stdaddress:new FormControl({value:this.stdprofile["address"],disabled: !this.isEditMode},[Validators.required]),
      stdfathername:new FormControl({value:this.stdprofile["fathername"],disabled: !this.isEditMode},[Validators.required]),
      stdmothername:new FormControl({value:this.stdprofile["mothername"],disabled: !this.isEditMode},[Validators.required]),

    })
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    const nameControl = this.stdprofileform.get('stdname');
    const emailControl=this.stdprofileform.get('stdemail');
    const stdcontact=this.stdprofileform.get('stdcontact');
    const stdfathername=this.stdprofileform.get('stdfathername');
    const stdmothername=this.stdprofileform.get('stdfathername');
    const stdrollnum=this.stdprofileform.get('stdrollnum');
    const stdaddressControl=this.stdprofileform.get('stdaddress');

    if (this.isEditMode) {
      stdrollnum.enable();
      nameControl.enable();
      emailControl.enable();
      stdcontact.enable();
      stdfathername.enable();
      stdmothername.enable();
      stdaddressControl.enable();
    } else {
      stdrollnum.disable();
      nameControl.disable();
      emailControl.disable();
      stdcontact.disable();
      stdfathername.disable();
      stdmothername.disable();
      stdaddressControl.disable();
    }
  }

  showSnackbar(msg:string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
    this.toggleEditMode();
  }

  updateStudentDetail(){
    // console.log(this.stdprofileform.get("stdname").value);
    const formJson=JSON.stringify({
      address:this.stdprofileform.get("stdaddress").value,
      phone:this.stdprofileform.get("stdcontact").value,
      name:this.stdprofileform.get("stdname").value,
      rollno:this.stdprofileform.get("stdrollnum").value,
      fathername:this.stdprofileform.get("stdfathername").value,
      mothername:this.stdprofileform.get("stdmothername").value,
      parentemail:this.stdprofileform.get("stdemail").value,
    })

    this.adser.updateStudent(formJson,this.stdprofile.id).subscribe(
    (data)=>{
      this.showSnackbar('Updated Successfully');

      setTimeout(() => {
        window.location.reload();
      }, 300);
    },
    (err)=>{
      this.showSnackbar("Error in Update Profile\n");
    }
    )
  }

  ngOnInit(): void {
  }

}
