import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  alertMsg: any;
  show= false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      cnfpassword: ['', [Validators.required, Validators.minLength(5)]],
    }, {
      validators: this.ValidatePassword.bind(this)
    })
  }

  ngOnInit(): void {
  }
  ValidatePassword(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.password.value;
    const cnf_password = passwordFormGroup.controls.cnfpassword.value;
    if(cnf_password !== new_password) {
      return {
        doesNotMatch: true
      }
    }
    return null;
  }

  register(){
    this.authService.Register(this.registerForm.value).subscribe(res => {
      console.log(res);
      if(res && res.token) {
        this.router.navigate(['/']);
      }
    }, err => {
      if(err.error.msg) {
        this.alertMsg = err.error.msg[0].message;
        this.show = true
      }else if(err.error.message) {
        this.alertMsg = err.error.message;
        this.show = true
      }
    })
    this.registerForm.reset();
  }

}
