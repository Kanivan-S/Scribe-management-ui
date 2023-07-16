import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AdminService} from '../admin.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


interface AdminProfile{
  id:string;
  email:string;
  name:string;
  phone:string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading:boolean =true;
  adminprofileform:FormGroup;
  hide :boolean= true;
  isEditMode: boolean = false;
  admninProfile:AdminProfile;
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

  showSnackbar(msg:string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
    this.toggleEditMode();
  }

  updateProfile(){
    const formJson=JSON.stringify({
      address:this.adminprofileform.get("adminaddress").value,
      phone:this.adminprofileform.get("admincontact").value,
      name:this.adminprofileform.get("adminname").value

    })
    console.log(formJson);
    this.adser.updateProfile(formJson,localStorage.getItem('email')).subscribe(
    (data)=>{
      this.showSnackbar('Updated Successfully');
    },
    (err)=>{
      this.showSnackbar("Error in Update Profile\n");
    }
    )

  }


  ngOnInit(): void {
    this.getAdminProfile();
  }

  getAdminProfile():void{
    this.adser.getAdminProfileService(localStorage.getItem('email')).subscribe(
      (data)=>{
        this.admninProfile=data;
        console.log(data);
        this.isLoading=false;
        this.adminprofileform=new FormGroup({
          adminname:new FormControl({value:this.admninProfile["name"]!==null?this.admninProfile["name"] :"NA",disabled: !this.isEditMode},[Validators.required]),
          admincontact:new FormControl({value:this.admninProfile["phone"]!==null?this.admninProfile["phone"] :"NA",disabled: !this.isEditMode},[Validators.required]),
          adminpswd:new FormControl({value:this.admninProfile["id"]!==null?this.admninProfile["id"] :"NA",disabled: true},[Validators.required]),
          adminemail:new FormControl({value:this.admninProfile["email"]!==null?this.admninProfile["email"] :"NA",disabled: true}, [Validators.required, Validators.email]),
          adminaddress:new FormControl({value:this.admninProfile["address"]!==null?this.admninProfile["address"] :"NA",disabled: !this.isEditMode},[Validators.required])
        })
      }
    )

  }


}

