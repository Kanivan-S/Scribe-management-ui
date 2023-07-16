import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { UsersServiceService } from 'src/app/users/users-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Exam } from '../exam/exam.component';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class CalendarComponent implements OnInit {
  coloredDates: Number[] = [new Date("07/17/2023").getTime()];

  upexam:Exam;
  isLoading:boolean=true;
  hashMap = new Map<number, Exam>();
  constructor(private _httpClient: HttpClient, public dialog: MatDialog,private adser:AdminService) {}

  hoveredDate: Date | null = null;
  selectedDate: Date | null = null;
  detailsdate: string | null = "None";
  detailsname: string | null = "None";
  detailsdesc:string | null = "None";
  dcity:string | null = "None";
  dstate:string | null = "None";
  dpostalcode:string | null = "None";
  onDateSelection(selectedDate: Date): void {

    console.log(this.hashMap);
    this.selectedDate = selectedDate;
    if (this.coloredDates.includes(selectedDate.getTime())) {
      this.detailsname=this.hashMap.get(selectedDate.getTime()).name;
      this.detailsdate=(this.hashMap.get(selectedDate.getTime()).date).toString();
      this.detailsdesc=this.hashMap.get(selectedDate.getTime()).desc;
      this.dcity=this.hashMap.get(selectedDate.getTime()).city;
      this.dstate=this.hashMap.get(selectedDate.getTime()).state;
      this.dpostalcode=this.hashMap.get(selectedDate.getTime()).postalcode;

    }
    else{
      this.detailsname="NA";
      this.detailsdate="NA";
      this.detailsdesc="NA";
      this.dcity="NA";
      this.dstate="NA";
      this.dpostalcode="NA";
    }
  }

  fectchExamlist(){
    this.adser.getExamlist().subscribe(
      (data)=>{
        this.isLoading=false;
        console.log(data.body);
        for(let i=0;i<data.body.length;i++){
          let stringd=new Date(data.body[i]["date"]).toISOString().split('T')[0];
          let dummyarr=stringd.split("-");
          let stringnew=dummyarr[1]+"/"+dummyarr[2]+"/"+dummyarr[0];
          let g=new Date(stringnew);
          this.coloredDates.push(g.getTime());
          this.hashMap.set(g.getTime(),data.body[i]);
        }

      }

    )
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    if (view === 'month' && this.coloredDates.includes(cellDate.getTime())) {
      return 'example-custom-date-class';
    }
    return '';
  };

  ngOnInit(): void {
    // this.isLoading=false;
    this.fectchExamlist();


  }
}
