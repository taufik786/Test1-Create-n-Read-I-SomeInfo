import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  districtForm: FormGroup;
  submitInfo: any;
  alertMsg = false;
  userDetails: any;
  socket: any;

  constructor(private authService: AuthService, private postService: PostService) {
    this.socket = io('http://localhost:5000');
  }

  ngOnInit(): void {
    this.districtForm = new FormGroup({
      district: new FormControl('', Validators.required)
    })
    this.getDistrict();
    this.socket.on('refreshPage', (data) =>{
      this.getDistrict();
    })
  }
  AddDistrict(){
    if(this.districtForm.invalid) {
      return
    }
    this.postService.District(this.districtForm.value).subscribe(res => {
      this.submitInfo = res.message;
      this.alertMsg = true
      this.socket.emit('refresh', {});
    }, err => {
      if(err.error.message) {
        this.submitInfo = err.error.message;
        this.alertMsg = true
      }
    })
    this.districtForm.reset();
  }
  close(){
    this.alertMsg = false;
  }
  getDistrict(){
    this.postService.GetAllDistrict().subscribe(res => {
      this.socket.on('refreshPage', {})
      console.log(res);
      this.userDetails = res.data
    })
  }

}
