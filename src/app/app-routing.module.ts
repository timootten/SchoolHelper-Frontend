import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './views/add/add.component';
import { CalenderComponent } from './views/calender/calender.component';
import { HomeComponent } from './views/home/home.component';
import { PointComponent } from './views/add/point/point.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calender', component: CalenderComponent },
  { path: 'add', component: AddComponent },
  { path: 'add/point', component: PointComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
