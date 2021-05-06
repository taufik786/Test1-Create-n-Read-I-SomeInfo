import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  show = false;
  alertMsg: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login(){
    this.authService.Login(this.loginForm.value).subscribe(res => {
      if(res && res.token) {
        this.router.navigate(['/']);
      }

    }, err => {
      if(err.error.message) {
        this.alertMsg = err.error.message;
        this.show = true
      }
    })
    this.loginForm.reset();
  }

}
