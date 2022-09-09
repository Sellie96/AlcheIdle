import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) {}

  login(model: any) {
    this.httpClient.post(`${this.baseUrl}/users/login`, model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.toastrService.error(error.error);
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