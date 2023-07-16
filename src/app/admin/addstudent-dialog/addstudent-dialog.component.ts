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




 showSnackbar(msg:string) {
   this.snackBar.open(msg, 'Close', {
     duration: 3000, // Duration in milliseconds
   });

 }

 addStudent(){
  const formJson=JSON.stringify({
    name:this.stdprofileform.get('stdname').value,
    address:this.stdprofileform.get('stdaddress').value,
    parentemail:this.stdprofileform.get('stdemail').value,
    fathername:this.stdprofileform.get('stdfathername').value,
    mothername:this.stdprofileform.get('stdmothername').value,
    rollno:this.stdprofileform.get('stdrollnum').value,
    phone:this.stdprofileform.get('stdcontact').value
  })

  console.log(formJson);

  this.adser.addStudents(formJson).subscribe(
    (data)=>{
      this.showSnackbar('Added Successfully');
      setTimeout(() => {
        window.location.reload();
      }, 300);
    },
    (err)=>{
      this.showSnackbar("Error in adding student details\n");
    }
  )

 }



 ngOnInit(): void {


 }


}
