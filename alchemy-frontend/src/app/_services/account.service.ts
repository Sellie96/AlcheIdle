import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  private charactersQuery: any;


  constructor(private apollo: Apollo) {
    this.charactersQuery = this.apollo.watchQuery({
      query: gql`query getCharacters {
        getCharacters {
          level
          hpMax
          hpCurrent
          xpMax
          xpCurrent
          damage
          accuracy
          armour
          evasion
          critChance
          gold
        }
      }`
    });
  }

  

  async getCharacters(): Promise<any> {
    const result = await this.charactersQuery.refetch();
    return result.data.getCharacters;
  }
}
