import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private authStatusListener = new Subject<boolean>();
  private token: string = "";
  isAuthenticated = false;

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getToken() {
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  login(model: any) {
    this.httpClient.post<{token:string}>(`${this.baseUrl}/users/login`, model).subscribe(
      (response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.toastrService.success('Logged in successfully');
        }
      },
      (error) => {
        console.log(error, 'error');
        this.toastrService.error(error.error.message);
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
