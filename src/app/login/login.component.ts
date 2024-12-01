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
  user: any = {
    username: '',
    password: ''
  };
  users:any[]=[];
  loginData:any;
  loginError:any;
  Login(){
    if (this.user.username == '' || this.user.password == '') {
      this.toaster.warning('Please Fill The Fields');
      return
    }

    this.service.getSampleData().subscribe((res) => {
      this.users = res.Users;

      if (this.users.find(x => x.Username === this.user.username && x.Password === this.user.password)) {
        // this.loginData = response.data;
        localStorage.setItem("UserName", this.user.username);
        localStorage.setItem("Token", 'lsakljbdjcvbdnjvndjsnvbdvjb');
        this.afterlogin(this.user);
      }else{
        this.loginError = 'Invalid UserName Or PassWord'
      }
      setTimeout(() => {
        this.loginError = null;
      }, 3000);
  },
    (error) => {
      throw new Error(error);
    });

      // this.service.Login(this.user) .subscribe(
      //   (response) => {
      //     if(response.status == 'error'){
      //       this.toaster.success('Create A New Account',response.message);
      //     } else if (response.status == 'success') {
      //       this.loginData = response.data;
      //         this.globalService.setLocalStorage("UserName", response.data.user.userName);
      //         this.globalService.setLocalStorage("Token", response.data.token);
      //         this.afterlogin(response.data);

      //     }
      //     this.user = {
      //       username: '',
      //       password: ''
      //     }
      //   },
      //     (error) => {
      //       this.toaster.error("error", error.error.message);
      //       // Swal.fire('error',error.error.message,'error');
      //       this.loginError = error.error.message;

      //       setTimeout(() => {
      //         this.loginError = null;
      //       }, 3000);
      //     }
      // );
  }
  afterlogin(data: any,org?:any) {
    localStorage.setItem("isLogin", "true");
    this.service.IsLogin = true;
    this.router.navigate(['']);
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
