import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateCharacter } from '../stateManagement/character/character.actions';
import { PlayerData } from '../stateManagement/character/CharacterDataTypes';


@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private authStatusListener = new Subject<boolean>();
  private token: string = "";
  isAuthenticated = false;

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private store: Store
    ) {}

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
        this.token = response.access_token;
        if (this.token) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.saveAuthData(this.token);
        this.store.dispatch(new CreateCharacter(response.userData));
        window.location.reload();
        this.toastrService.success(response.message);
        }
      },
      (error) => {
        this.toastrService.error(error.error.message);
      }
    );
  }

  register(model: any) {
    this.httpClient.post<{message: string}>(`${this.baseUrl}/users/register`, model).subscribe(
      (response) => {
        this.toastrService.success(response.message);
      },
      (error) => {
        this.toastrService.success(error.message);
      }
    );
  }

  getPlayerData(username: string) {
    this.httpClient.post<{playerData: PlayerData}>(`${this.baseUrl}/users/profile`, {username: username}).subscribe(
      (response) => {
        this.store.dispatch(new CreateCharacter(response.playerData));
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }

  logout() {
    this.clearAuthData();
    this.authStatusListener.next(false);
    window.location.reload();
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
