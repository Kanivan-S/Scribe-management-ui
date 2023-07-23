import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginError: string;
  logo: string;
  hide: boolean = true;

  public showPassword: boolean = false;
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private aps: AppService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
    this.registerForm = new FormGroup({
      uname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get isAdmin(): boolean {
    return Array.from(this.route.snapshot.url)[0].path.toString() === 'alogin';
  }

  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }

  ngOnInit(): void {
    console.log(Array.from(this.route.snapshot.url));
  }
  onLogin() {
    const url = Array.from(this.route.snapshot.url);
    if (this.isAdmin == true) {
      const formJson = JSON.stringify({
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      });
      this.aps.authenticateUser(formJson, this.isAdmin).subscribe(
        (data: any) => {
          if (data) {
            localStorage.clear();
            localStorage.setItem('token', data.body.message);
            localStorage.setItem('email', data.body.result.email);
            localStorage.setItem('id', data.body.result.id);
            localStorage.setItem('isUser', 'false');
            this.router.navigate(['admin']);
          } else {
            this.showSnackbar('Server Request Try again.');
          }
        },
        (err) => {
          this.showSnackbar('Invalid credentials for admin login..\n');
        }
      );
    } else {
      const formJson = JSON.stringify({
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      });

      this.aps.authenticateUser(formJson, this.isAdmin).subscribe(
        (data) => {
          localStorage.clear();
          localStorage.setItem('token', data.body.message);
          localStorage.setItem('email', data.body.result.email);
          localStorage.setItem('id', data.body.result.id);
          localStorage.setItem('isUser', 'true');
          this.router.navigate(['user']);
        },
        (err) => {
          alert('Error in login credentials for user..\n');
          console.log(err);
        }
      );
    }
  }
  onRegister() {
    console.log(this.registerForm);
    const formJson = JSON.stringify({
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      name: this.registerForm.get('uname').value,
    });

    this.aps.authenticateRegister(formJson).subscribe(
      (data) => {
        alert('user registered!');
        localStorage.setItem('token', data.body.message);
        localStorage.setItem('email', data.body.result.email);
        localStorage.setItem('isUser', 'true');
        localStorage.setItem('id', data.body.result.id);
        this.router.navigate(['user']);
      },
      (err) => {
        alert('Error in Register\n');
        this.loginError = err;
        console.log(err);
      }
    );
  }
}
