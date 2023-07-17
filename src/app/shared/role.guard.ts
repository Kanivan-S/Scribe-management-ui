import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router :Router,private snackBar: MatSnackBar){}
  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
  canActivate(){
    let Role=localStorage.getItem("isUser");
    console.log(Role+"///");
    if(Role=="false"){
      return true;
    }
    this.showSnackbar("Invalid Access");
    this.router.navigate(['/']);
    return false;
  }

}
