import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  childForm: FormGroup;
  alertMsg= false
  submitInfo: any;
  userDetails: any;
  socket: any;

  constructor(private fb: FormBuilder, private postService: PostService, private authService: AuthService) {
    this.childForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
    })

    this.socket = io('http://localhost:5000');
  }

  ngOnInit(): void {
    this.GetAllChild();
    this.socket.on('refreshPage', (data) =>{
      this.GetAllChild();
    })
  }

  OnChild(){
    this.postService.Child(this.childForm.value).subscribe(res => {
      this.submitInfo = res.message;
      this.alertMsg = true
      this.socket.emit('refresh', {})
    }, err => {
      if(err.error.message) {
        this.submitInfo = err.error.message;
        this.alertMsg = true
      }
    })
    this.childForm.reset();
  }
  close(){
    this.alertMsg = false;
  }

  GetAllChild(){
    this.postService.GetAllChild().subscribe(res => {
      console.log(res);
      this.userDetails = res.data;
      this.socket.on('refreshPage', {})
    })
  }

}
