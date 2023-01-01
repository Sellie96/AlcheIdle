import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateCharacter } from '../state/character.actions';
import { PlayerData } from '../state/CharacterDataTypes';


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
    private toastController: ToastController,
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

  async login(model: any) {
    this.httpClient.post<{access_token:string, userData: PlayerData, message: string}>(`${this.baseUrl}/users/login`, model).pipe(
        tap(async (response: { access_token: string; userData: PlayerData; message: string}) => {
            this.token = response.access_token;
            if (this.token) {
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.saveAuthData(this.token);
                this.store.dispatch(new CreateCharacter(response.userData));
                window.location.reload();
                let toast = this.toastController.create({
                  message: response.message,
                  duration: 1500,
                  position: 'top'
                })
        
               await (await toast).present()
            }
        }),
        catchError(error => {
          return throwError(() => new Error(error));
      })
    ).subscribe();
}

  async register(model: any) {
    this.httpClient.post<{message: string}>(`${this.baseUrl}/users/register`, model).subscribe(
      async (response) => {
       let toast = this.toastController.create({
          message: response.message,
          duration: 1500,
          position: 'top'
        })

       await (await toast).present()
      },
      async (error) => {
        let toast = this.toastController.create({
          message: error.message,
          duration: 1500,
          position: 'top'
        })

       await (await toast).present()
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
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  return { token };
}

  
}
