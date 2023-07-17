import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { API } from 'src/environments/environment';

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
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  hoveredDate: Date | null = null;
  selectedDate: Date | null = null;
  currentView: Exam[] = [];

  onDateSelection(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    if (this.coloredDates.includes(selectedDate.getTime())) {
      this.currentView = this.hashMap[selectedDate.getTime()];
    } else {
      this.currentView = [];
    }
  }

  fectchExamlist() {
    const vId = localStorage.getItem('id');
    this.http.get<any>(`${API}/volunteer/volunteeredexams/${vId}`).subscribe(
      (data) => {
        this.isLoading = false;
        for (let i = 0; i < data.length; i++) {
          const exam = {
            date: data[i].exam.date,
            name: data[i].exam.name,
            desc: data[i].exam.desc,
            city: data[i].exam.city,
            state: data[i].exam.state,
            postalCode: data[i].exam.code,
          };
          let stringd = new Date(exam.date).toISOString().split('T')[0];
          let dummyarr = stringd.split('-');
          let stringnew = dummyarr[1] + '/' + dummyarr[2] + '/' + dummyarr[0];
          let g = new Date(stringnew);
          this.coloredDates.push(g.getTime());
          if (g.getTime() in this.hashMap) {
            this.hashMap[g.getTime()] = this.hashMap[g.getTime()].concat(exam);
          } else {
            this.hashMap[g.getTime()] = [exam];
          }
        }
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
