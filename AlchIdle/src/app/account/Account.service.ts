import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, Subject, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateCharacter } from '../state/character.actions';
import { PlayerData } from '../state/CharacterDataTypes';
import { ToastService } from '../utils/toast.service';
import { LoginForm, LoginResponse, RegisterForm } from './Account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private authStatusListener = new Subject<boolean>();
  private token: string = '';

  baseUrl = environment.apiUrl;
  isAuthenticated = false;

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastService,
    private store: Store
  ) {}

  async login(loginModel: LoginForm) {
    this.httpClient
      .post<LoginResponse>(`${this.baseUrl}/users/login`, loginModel)
      .pipe(
        tap(
          async (response: LoginResponse) => {
            this.token = response.access_token;
            if (this.token) {
              this.isAuthenticated = true;
              this.authStatusListener.next(true);
              this.saveAuthData(this.token);
              this.store.dispatch(new CreateCharacter(response.userData));
              window.location.reload();
              (await this.toastr.getSuccessToast(response.message)).present();
            }
          }
        ),
        catchError(async (error) => {
          (await this.toastr.getErrorToast()).present();
          return throwError(() => new Error(error));
        })
      )
      .subscribe();
  }

  async register(registerModel: RegisterForm) {
    this.httpClient
      .post<{ message: string }>(`${this.baseUrl}/users/register`, registerModel)
      .pipe(
        switchMap(async (response) => {
          (await this.toastr.getSuccessToast(response.message)).present();
  
          setTimeout(() => {
            let data: LoginForm = {
              username: registerModel.username,
              password: registerModel.password
            }
            this.login(data)
         }, 500);
        })
      )
      .subscribe(
        async (response) => {
          // Handle successful login
        },
        async (_) => {
          (await this.toastr.getErrorToast()).present();
        }
      );
  }

  getPlayerData(username: string) {
    this.httpClient
      .post<{ playerData: PlayerData }>(`${this.baseUrl}/users/profile`, {
        username: username,
      })
      .subscribe(
        (response) => {
          this.store.dispatch(new CreateCharacter(response.playerData));
        },
        async (_) => {
          (await this.toastr.getErrorToast()).present();
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

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (authInformation) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(this.isAuthenticated);
    }
  }


  private getAuthData() {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    return { token };
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

}
