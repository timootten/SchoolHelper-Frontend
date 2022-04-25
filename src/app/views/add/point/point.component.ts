import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {

  days = new Map();

  weekday = new Date().getDay()+1;

  weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

  weekdaysRegular = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"  ];

  selected = this.weekdays[this.weekday];

  subject: any;

  number: Number | undefined;

  constructor(
    private firestore: AngularFirestore,
  ) {
    firestore.collection('schedule').get().subscribe(data => {
      data.forEach(doc => {
        const data: any = doc.data();
        this.days.set(doc.id, Object.keys(data));
      });
    });
   }

  ngOnInit(): void {
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  updateNumber(event: any): void {
    this.number = event.target.value;
  }

  // get date from last selected weekday
  getDate(): Date {

    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - this.weekdaysRegular.slice().reverse().indexOf(this.selected) - 1);
    return date;
  }

  submit() {
    if (this.selected === undefined || this.subject === undefined || this.number == undefined || this.number.toString() === '') return;

    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const data = { selected: this.selected, subject: this.subject, number: this.number, date: date };
    this.firestore.collection("users").doc("Leon").set({
      [date.toLocaleDateString('de-DE')]: { [this.subject]: data }
    }, { merge: true }).then(() => {
      alert("Erfolgreich gespeichert");
    });
  }


}
