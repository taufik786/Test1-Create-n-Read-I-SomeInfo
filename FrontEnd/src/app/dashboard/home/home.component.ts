import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  labels: string[];
  data: number[];
  pieChartType: string = 'pie';
  colors: any = ['#53a759', '#5fb2c6', '#e88b44', '#e23f3d'];
  ChartLegend:boolean = true;
  pieChartColors: any;
  options: any = {
    legend: {
      position: 'right',
      orient:  'vertical',
    }
  }
  constructor() { }

  ngOnInit(): void {
    this.makeChartData();
  }
  makeChartData(){
    this.pieChartColors = [{ backgroundColor: this.colors }];
    this.data = [10, 2000, 101, 45];
    this.labels = ['name', 'email', 'address', 'state']
  }

}
