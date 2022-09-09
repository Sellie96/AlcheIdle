import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateCharacter } from '../stateManagement/character.actions';
import { PlayerData } from '../stateManagement/CharacterDataTypes';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private authStatusListener = new Subject<boolean>();
  private token: string = "";
  isAuthenticated = false;

  constructor(private httpClient: HttpClient, private toastrService: ToastrService, private router: Router, private store: Store) {}

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
    this.httpClient.post<{access_token:string, userData: PlayerData, message: string}>(`${this.baseUrl}/users/login`, model).subscribe(
      (response) => {
        const token = response.access_token;
        this.token = token;
        console.log(response);
        if (token) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.saveAuthData(token);
        console.log(response);
        this.store.dispatch(new CreateCharacter(response.userData));
        // window.location.reload();
        this.toastrService.success(response.message);
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

  logout() {
    this.clearAuthData();
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    this.token = authInformation!.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  private getAuthData() {
    const token = localStorage.getItem("token");

    if(!token){
     return null;
    }
    return {
      token: token
    }
  }
}
