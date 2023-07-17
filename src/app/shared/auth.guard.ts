import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router :Router,private snackBar: MatSnackBar,private auth:AuthService){}
  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
  canActivate(){
    if(this.auth.isLoggedin()){
      return true;
    }
    this.showSnackbar("Invalid Access");
    this.router.navigate(['/']);
    return false;
  }

}
