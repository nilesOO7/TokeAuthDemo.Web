import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [DataService]
})

export class SignUpComponent implements OnInit {

  userName: string;
  password: string;
  passwordConfirm: string;
  signupError: boolean;
  signupSuccess: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.signupError = false;
    this.signupSuccess = false;
  }

  register() {

    if (
      this.userName
      && this.password
      && this.passwordConfirm
      && this.password === this.passwordConfirm) {

      this.dataService
        .register(this.userName, this.password, this.passwordConfirm)
        .subscribe(data => {
          this.signupSuccess = true;
          this.userName = '';
          this.password = '';
          this.passwordConfirm = '';
        },
          err => {
            this.signupError = true;
          });
    }
  }

}
