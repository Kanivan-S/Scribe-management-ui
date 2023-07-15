import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  title = 'Users-panel-layout';
  sideBarOpen = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToExamRegistration(): void {
    this.router.navigate(['/volunteer-registration']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
