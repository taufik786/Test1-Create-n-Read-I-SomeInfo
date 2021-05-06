import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { DashboardComponent } from './dashboard.component';
import { DistrictComponent } from './district/district.component';
import { HomeComponent } from './home/home.component';
import { StateComponent } from './state/state.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'state', component: StateComponent },
      { path: 'district', component: DistrictComponent },
      { path: 'child', component: ChildComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
