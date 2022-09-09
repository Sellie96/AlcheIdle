import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  register(model: any) {
    this.httpClient.post(this.baseUrl + 'account/register', model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
