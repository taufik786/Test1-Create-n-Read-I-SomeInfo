import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { io } from 'socket.io-client';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  stateForm: FormGroup;
  submitInfo: any;
  alertMsg = false;
  FetchedDta: any;
  socket: any;

  constructor(private postService: PostService) {
    this.socket = io('http://localhost:5000');
  }

  ngOnInit(): void {
    this.stateForm = new FormGroup({
      state: new FormControl('', Validators.required)
    })
    this.getStates();
    this.socket.on('refreshPage', (data) =>{
      this.getStates();
    })
  }

  createState(){
    this.postService.State(this.stateForm.value).subscribe(res => {
      this.submitInfo = res.message;
      this.alertMsg = true
      this.socket.emit('refresh', {})
    }, err => {
      if(err.error.message) {
        this.submitInfo = err.error.message;
        this.alertMsg = true
      }
    })
    this.stateForm.reset();
  }
  close(){
    this.alertMsg = false;
  }

  getStates(){
    this.postService.GetAllState().subscribe(res => {
      console.log(res);
      this.FetchedDta = res.data;
      this.socket.on('refreshPage', {})
    })
  }

}
