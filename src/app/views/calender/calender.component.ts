import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  selected: Date | null = this.getDefaultDate();

  days: any = {};

  info: string | undefined;


  @ViewChild(MatCalendar, {static: false}) calendar: MatCalendar<Date> | undefined;

  constructor(private firestore: AngularFirestore) {
    // get from collection users and from doc Leon every collection

  }

  ngOnInit(): void {
    this.firestore.collection('users').doc("Leon").get().subscribe(result => {
      this.days = result.data();
      this.calendar?.updateTodaysDate();
      this.updateText();
    });
  }

  updateText() {
    const day = this.selected?.toLocaleDateString('de-DE');
    this.info = "Ausgewählter Tag: " + day;
    if(day == undefined || !this.days[day]) return;
    Object.entries(this.days[day]).forEach(subject => {
      let obj: any = subject[1];
      this.info += "\n" + obj.subject + ": " + obj.number;
    });
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if(this.days[date.toLocaleDateString('de-DE')]) {
        var green = true;
        const day = this.days[date.toLocaleDateString('de-DE')];
        Object.entries(day).forEach(subject => {
          let obj: any = subject[1];
          if(obj.number < 2)
            green = false;
        });
        if(green)
          return 'green';
        return 'red';
      }
      return '';
    };
  }

  getDefaultDate(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

}
