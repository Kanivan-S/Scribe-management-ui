import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {


  constructor() { }

  get isAdmin(): boolean {
   return (localStorage.getItem("isUser")=="false");
  }
  get isUser(): boolean {
    return (localStorage.getItem("isUser")=="true")
  }

  ngOnInit(): void {

  }

}
