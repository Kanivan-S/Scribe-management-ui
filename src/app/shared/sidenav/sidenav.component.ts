import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {


  constructor() { }

  get isAdmin(): boolean {
    return true;
  }
  get isUser(): boolean {
    return true;
  }

  ngOnInit(): void {

  }

}
