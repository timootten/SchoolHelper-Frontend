import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  selected: Date | null = this.getDefaultDate();

  constructor() { }

  ngOnInit(): void {
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      console.log(date)
      if (date.getDate() === 1) {
        return 'special-date';
      } else {
        return '';
      }
    };
  }

  getDefaultDate(): Date {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

}
