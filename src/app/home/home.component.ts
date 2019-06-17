import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';

import { GitUser } from '../git-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DataService]
})

export class HomeComponent implements OnInit {

  loggedInUser: string;
  gitUsers: GitUser[];

  constructor(
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {

    var loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      this.router.navigate(['login']);
    }
    else {
      this.loggedInUser = localStorage.getItem("loggedInUser");

      this.dataService.getAll<GitUser[]>('async-values')
        .subscribe((resp: GitUser[]) => {
          this.gitUsers = resp;
        },
          err => {
            this.gitUsers = [];
          });
    }
  }

  logout() {
    localStorage.removeItem('dataToken');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['login']);
  }
}
