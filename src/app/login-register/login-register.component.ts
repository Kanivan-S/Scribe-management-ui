import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';



@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginError:string;
  logo:string;
  hide :boolean= true;



  public showPassword: boolean = false;
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  constructor(private router:Router,private route:ActivatedRoute,private aps:AppService) {
    this.loginForm=new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    })
    this.registerForm = new FormGroup({
      uname:new FormControl('',Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
   }

   get isAdmin(): boolean {
    return Array.from(this.route.snapshot.url)[0].path.toString() === 'alogin';
  }

  ngOnInit(): void {
    console.log(Array.from(this.route.snapshot.url));
  }
  onLogin(){

    const url=Array.from(this.route.snapshot.url);
    if(this.isAdmin==true){
      const formJson=JSON.stringify({
        email:this.loginForm.get('email').value,
        password:this.loginForm.get('password').value
      })
      this.aps.authenticateUser(formJson,this.isAdmin).subscribe(
        (data:any)=>{
          if(data){
            localStorage.clear();
            localStorage.setItem("email",data.body.email);
            localStorage.setItem("id",data.body.id);
            this.router.navigate(['admin']);
          }
          else{
            alert("Server Request Try again.");
          }
        },
        (err)=>{
          alert("Invalid credentials for admin login..\n");
        }
       )
    }
    else{

      const formJson=JSON.stringify({
        email:this.loginForm.get('email').value,
        password:this.loginForm.get('password').value
      })

      this.aps.authenticateUser(formJson,this.isAdmin).subscribe(
        (data)=>{
          localStorage.clear();
          localStorage.setItem("email",data.body.email);
          localStorage.setItem("id",data.body.id);
            this.router.navigate(['user']);
        },
        (err)=>{
          alert("Error in login credentials for user..\n");
          console.log(err);
        }
      )
    }
  }
  onRegister(){
    console.log(this.registerForm);
    const formJson=JSON.stringify({
      email:this.registerForm.get("email").value,
      password:this.registerForm.get("password").value,
      name:this.registerForm.get("uname").value
    })


    this.aps.authenticateRegister(formJson).subscribe(
    (data)=>{
      alert("user registered!");
      localStorage.setItem("email",data.body.email);

           localStorage.setItem("id",data.body.id);
           this.router.navigate(['user']);
    },
    (err)=>{
      alert("Error in Register\n");
      this.loginError=err;
      console.log(err);
    }
    )
  }

}
