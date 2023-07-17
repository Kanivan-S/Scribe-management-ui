import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { UsersServiceService } from 'src/app/users/users-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  coloredDates: Number[] = [];

  upexam: Exam;
  isLoading: boolean = true;
  hashMap = new Map<number, Exam[]>();
  constructor(
    private _httpClient: HttpClient,
    public dialog: MatDialog,
    private adser: AdminService
  ) {}

  hoveredDate: Date | null = null;
  selectedDate: Date | null = null;
  currentView: Exam[] = [];

  onDateSelection(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    console.log(this.selectedDate);
    if (this.coloredDates.includes(selectedDate.getTime())) {
      this.currentView = this.hashMap[selectedDate.getTime()];
    } else {
      this.currentView = [];
    }
    console.log('selected: ', this.currentView);
  }

  fectchExamlist() {
    this.adser.getExamlist().subscribe(
      (data) => {
        this.isLoading = false;
        console.log(data.body);
        for (let i = 0; i < data.body.length; i++) {
          let stringd = new Date(data.body[i]['date'])
            .toISOString()
            .split('T')[0];
          let dummyarr = stringd.split('-');
          let stringnew = dummyarr[1] + '/' + dummyarr[2] + '/' + dummyarr[0];
          let g = new Date(stringnew);
          this.coloredDates.push(g.getTime());
          if (g.getTime() in this.hashMap) {
            this.hashMap[g.getTime()] = this.hashMap[g.getTime()].concat(
              data.body[i]
            );
          } else {
            this.hashMap[g.getTime()] = [data.body[i]];
          }
        }
        // const date = new Date(Date.now());

        // let day = date.getDate();
        // let month = date.getMonth() + 1;
        // let year = date.getFullYear();

        // let currentDate = `${year}-${month}-${day}T00:00:00`;
        // const d = new Date(Date.parse(currentDate));
        // console.log('d', d);
        // this.onDateSelection(d);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month' && this.coloredDates.includes(cellDate.getTime())) {
      return 'example-custom-date-class';
    }
    return '';
  };

  ngOnInit(): void {
    this.fectchExamlist();
  }
}

export interface Exam {
  date: string | null;
  name: string | null;
  desc: string | null;
  city: string | null;
  state: string | null;
  postalcode: string | null;
}
