import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { UsersServiceService } from '../users-service.service';

interface UserProfile{
  id:string;
  email:string;
  name:string;
  phone:string;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  isLoading:boolean =true;
  userprofileform:FormGroup;
  hide :boolean= true;
  isEditMode: boolean = false;
  userProfile:UserProfile;
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



  showSnackbar(msg:string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
    this.toggleEditMode();
  }

  updateProfile(){
    const formJson=JSON.stringify({
      address:this.userprofileform.get("useraddress").value,
      phone:this.userprofileform.get("usercontact").value,
      name:this.userprofileform.get("username").value

    })

    console.log(formJson);


    this.adser.updateProfile(formJson,localStorage.getItem('email')).subscribe(
    (data)=>{
      this.showSnackbar('Updated Successfully');

    },
    (err)=>{
      this.showSnackbar('Error in Update Profile');
    }
    )

  }


  ngOnInit(): void {
   this.getUserProfile();
  }
  getUserProfile():void{
    this.adser.getUserProfileService(localStorage.getItem('email')).subscribe(
      (data)=>{
        this.userProfile=data;
        console.log(data);
        this.isLoading=false;
        this.userprofileform=new FormGroup({
          username:new FormControl({value:this.userProfile["name"]!==null?this.userProfile["name"] :"NA",disabled: !this.isEditMode},[Validators.required]),
          usercontact:new FormControl({value:this.userProfile["phone"]!==null?this.userProfile["phone"] :"NA",disabled: !this.isEditMode},[Validators.required]),
          userid:new FormControl({value:this.userProfile["id"]!==null?this.userProfile["id"] :"NA",disabled: true},[Validators.required]),
          useremail:new FormControl({value:this.userProfile["email"]!==null?this.userProfile["email"] :"NA",disabled: true}, [Validators.required, Validators.email]),
          useraddress:new FormControl({value:this.userProfile["address"]!==null?this.userProfile["address"] :"NA",disabled: !this.isEditMode},[Validators.required])
        })
      }
    )

  }


}

