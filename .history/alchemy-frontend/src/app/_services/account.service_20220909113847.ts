import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  login(model: any) {
    this.httpClient.post(`${this.baseUrl}/users/login`, model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }

  register(model: any) {
    this.httpClient.post(`${this.baseUrl}/users/register`, model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }
}
