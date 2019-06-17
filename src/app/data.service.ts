import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public login(userName: string, password: string): Observable<any> {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('grant_type', 'password');
    urlSearchParams.set('username', userName);
    urlSearchParams.set('password', password);
    let body = urlSearchParams.toString()

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    };

    return this.httpClient.post('http://localhost:53075/Token', body, httpOptions);
    //return this.httpClient.get('http://localhost:53075/api/async-values-noauth');
    //return this.httpClient.get('http://localhost:46565/api/Skills');
  }

  public getAll<T>(actionName: string): Observable<T> {

    let serviceURL = 'http://localhost:53075/api/' + actionName;
    let token = localStorage.getItem("dataToken");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.httpClient.get<T>(serviceURL, httpOptions);
  }

  public register(userName: string, password: string, confirmPassword: string): Observable<any> {

    let request = {
      Email: userName,
      Password: password,
      ConfirmPassword: confirmPassword
    };
    let body = JSON.stringify(request);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.httpClient.post('http://localhost:53075/api/Account/Register', body, httpOptions);   
  }
}
