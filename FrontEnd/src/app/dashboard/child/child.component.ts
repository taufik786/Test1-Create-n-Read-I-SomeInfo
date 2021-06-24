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
  userDetails: [];
  socket: any;
  showSpinner = false;
  deleteMsg: any;
  showSpinner1: boolean;
  alertMsg1 = false;
  userId: string;

  constructor(private fb: FormBuilder, private postService: PostService, private authService: AuthService) {
    this.childForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
    })

    this.socket = io('http://localhost:5000');
  }
  user : any;
  ngOnInit(): void {
    this.user = this.authService.currentUserValue;

    this.userId = this.user.user._id;
    console.log(this.userId);

    this.GetAllChild();
    this.socket.on('refreshPage', (data) =>{
      this.GetAllChild();
    })
  }

  OnChild(){
    this.showSpinner = true;
    this.postService.Child(this.childForm.value).subscribe(res => {
      setTimeout(() => {
        this.showSpinner = false;
        this.submitInfo = res.message;
        this.alertMsg = true
        this.socket.emit('refresh', {})
      }, 5000);
    }, err => {
      this.showSpinner=false;
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
  close1(){
    this.alertMsg1 = false;
  }

  GetAllChild(){
    this.postService.GetAllChild().subscribe(res => {
      console.log(res);
      this.userDetails = res.data;
      this.socket.on('refreshPage', {})
    })
  }

  onDelete(postId: string){
    this.showSpinner1 = true;
    this.postService.DeleteChild(postId).subscribe((res) => {
      setTimeout(() => {
        this.showSpinner1 = false;
        this.deleteMsg = res.message
        this.alertMsg1 = true
        this.socket.emit('refresh', {})
      }, 5000);
    })
  }

}
