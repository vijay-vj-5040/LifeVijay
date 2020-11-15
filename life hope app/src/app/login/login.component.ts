import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../common/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted=false;
  loginForm:FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService:AuthService,   ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      passWord: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
  });
  }
  onLogin(){
    this.submitted = true; 
     
    var body ={
      userName: this.loginForm.controls.userName.value,
      password:this.loginForm.controls.passWord.value
      }

      this.authService.login(body);
  }

  get f() {
    return this.loginForm.controls;
    } 
}
