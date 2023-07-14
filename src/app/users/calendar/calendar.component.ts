import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  coloredDates: Number[] = [new Date("07/17/2023").getTime(),new Date("07/30/2023").getTime()];

  hoveredDate: Date | null = null;
  selectedDate: Date | null = null;
  details: string | null = null;
  onDateSelection(selectedDate: Date): void {

    this.selectedDate = selectedDate;
    if (this.coloredDates.includes(selectedDate.getTime())) {

      this.updateDetails();
    }
    else{
      this.details="No Exam Accepted"
    }

  }
  updateDetails(): void {
    // Logic to fetch or calculate the details based on the selected date
    // Assign the details to the 'details' variable
    this.details = "Accepted";
  }


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    if (view === 'month' && this.coloredDates.includes(cellDate.getTime())) {
      return 'example-custom-date-class';
    }
    return '';
  };

  constructor() { }
  ngOnInit(): void {

  }
}
