import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  labels: string[];
  data: number[];
  pieChartType: string = 'pie';
  colors: any = ['#53a759', '#5fb2c6', '#e88b44', '#e23f3d'];
  ChartLegend: boolean = true;
  pieChartColors: any;
  options: any = {
    legend: {
      position: 'right',
      orient: 'vertical',
    },
  };
  allState: any;
  totalStates: number;
  allData: any;
  totalDistrict: number;
  totalChilds: number;
  allData1: any;
  socket: any;
  allData2: any;
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {
    this.socket = io('http://localhost:5000');
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    console.log(this.user);

    this.makeChartData();
    this.AllState();
    this.AllChild();
    this.AllDistrict();

    this.socket.on('refreshPage', data => {
      this.AllState();
      this.AllChild();
      this.AllDistrict();
    })
  }
  makeChartData() {
    this.pieChartColors = [{ backgroundColor: this.colors }];
    this.data = [10, 2000, 101, 45];
    this.labels = ['name', 'email', 'address', 'state'];
  }

  AllState() {
    this.postService.GetAllState().subscribe((res) => {
      this.allData = res.data;
      let arr = [];
      for (let i = 0; i < this.allData.length; i++) {
        if (this.allData[i]) {
          arr.push(this.allData[i]);
          this.totalStates = arr.length;
        }
      }
    });
    this.socket.on('refreshPage', {})
  }
  AllChild() {
    this.postService.GetAllChild().subscribe((res) => {
      this.allData1 = res.data;
      let arr1 = [];
      for (let i = 0; i < this.allData1.length; i++) {
        if (this.allData1[i]) {
          arr1.push(this.allData1[i]);
          this.totalChilds = arr1.length;
        }
      }
    });
    this.socket.on('refreshPage', {})
  }
  AllDistrict() {
    this.postService.GetAllDistrict().subscribe((res) => {
      this.allData2 = res.data;
      let arr2 = [];
      for (let i = 0; i < this.allData2.length; i++) {
        if (this.allData2[i]) {
          arr2.push(this.allData2[i]);
          this.totalDistrict = arr2.length;
        }
      }
    });
    this.socket.on('refreshPage', {})
  }
}
