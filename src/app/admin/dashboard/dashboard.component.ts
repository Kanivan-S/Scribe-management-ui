import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AdminService} from '../admin.service';

interface Catgory{
  id:string;
  catname:string;
}
interface resp{
  msg:String;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private router:Router,private route:ActivatedRoute,private adser:AdminService) {

   }

   get isAdmin(): boolean {
    return (localStorage.getItem("userType")=="admin");
  }

  ngOnInit( ): void {

  }

}
