import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {

  days = new Map();

  weekday = new Date().getDay();

  weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag","Samstag"];

  selected = this.weekdays[this.weekday];

  constructor(
    firestore: AngularFirestore,
  ) {
    firestore.collection('schedule').get().subscribe(data => {
      data.forEach(doc => {
        const data: any = doc.data();
        this.days.set(doc.id, Object.keys(data));
      });
      console.log(this.days.get('Freitag'))
    });
   }

  ngOnInit(): void {
  }


}
