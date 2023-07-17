import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';
import { PhoneDialogComponent } from '../phone-dialog/phone-dialog.component';

@Component({
  selector: 'app-contact-parents',
  templateUrl: './contact-parents.component.html',
  styleUrls: ['./contact-parents.component.scss'],
})
export class ContactParentsComponent implements OnInit {
  constructor(public dialog:MatDialog) {}
  channel: string | null = null;
  data: any[] = []; //data of students
  emailColumns: string[] = ['student', 'email', 'action'];
  ngOnInit(): void {}
  openEmail(){
    this.dialog.open(EmailDialogComponent,{
      width:"80%",
      data:this.data
    })
  }
  openPhone(){
    this.dialog.open(PhoneDialogComponent,{
      width:"80%",
      data:this.data
    })
  }
}
