import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Service } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private service:Service , private toaster:ToastrService,private router:Router){}
  ngOnInit() {
    this.checkLogin();

    var html = document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }
  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
  user = {
    username: '',
    password: '',
  };
  ShowSignUp:boolean=false;
  users:any[]=[];
  loginData:any;
  SignInUpError:any;
  Login(){
    if (this.user.username == '' || this.user.password == '') {
      this.toaster.warning('Please Fill The Fields');
      return
    }

      this.service.Login(this.user) .subscribe(
        (response) => {
          if(!response.success){
            this.toaster.error('Create A New Account',response.message);
          } else if (response.success) {
            this.loginData = response.data;
            localStorage.setItem("UserName", this.loginData.username);
            localStorage.setItem("Token", this.loginData.token);
              this.afterlogin(response.data);
          }
          this.user = {
            username: '',
            password: ''
          }
        },
          (error) => {
            this.toaster.error("error", error.error.message);
            this.SignInUpError = error.error.message;

            setTimeout(() => {
              this.SignInUpError = null;
            }, 3000);
          }
      );
  }
  afterlogin(data: any,org?:any) {
    localStorage.setItem("isLogin", "true");
    this.service.IsLogin = true;
    this.router.navigate(['']);
  }
  Signupuser={
    username: '',
    password: '',
    email:''
  }
  Register(){
    if (this.Signupuser.username == '' || this.Signupuser.password == '' || this.Signupuser.email == '') {
      this.toaster.warning('Please Fill The Fields');
      return
    }
    if(!this.Signupuser.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)){
      this.SignInUpError = 'Invalid Email Id';
      setTimeout(() => {
        this.SignInUpError = null;
      }, 3000);

      return;
    }
    this.service.Register(this.Signupuser) .subscribe(
      (response) => {
        if(!response.success){
          this.toaster.warning('Login error',response.message);
          return
        }
        this.toaster.success('Account Created','Login Now!');
        this.Signupuser = {
          username: '',
          password: '',
          email:''
        }
        this.ShowSignUp = false;
      },
        (error) => {
          this.toaster.error("error", error.error.message);
          this.SignInUpError = error.error.message;

          setTimeout(() => {
            this.SignInUpError = null;
          }, 3000);
        }
    );
  }


  checkLogin() {
    if ((localStorage.getItem('isLogin') && localStorage.getItem('isLogin') == "true") && localStorage.getItem('Token')) {
      this.router.navigate([''])
    }else{
      localStorage.clear();
      this.service.IsLogin = false;
    }
  }
}
