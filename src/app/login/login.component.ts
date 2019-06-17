import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataService]
})
export class LoginComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router) { }

  userName: string;
  password: string;
  loginError: boolean;
  loginErrorTxt: string;

  ngOnInit() {
    this.loginError = false;
  }

  login() {
    if (this.userName && this.password) {
      this.dataService
        .login(this.userName, this.password)
        .subscribe((data: any) => {
          this.loginError = false;
          localStorage.setItem('dataToken', data.access_token);
          localStorage.setItem('loggedInUser', data.userName);
          this.router.navigate(['home']);
        }, err => {
          if (err.status == 400) {
            this.loginError = true;
          }
        });
    }
  }

}
