import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictComponent } from './district/district.component';
import { ChildComponent } from './child/child.component';
import { HomeComponent } from './home/home.component';
import { StateComponent } from './state/state.component';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboardd-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    DashboardComponent,
    DistrictComponent,
    ChildComponent,
    HomeComponent,
    StateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgbModule
  ]
})
export class DashboardModule { }
