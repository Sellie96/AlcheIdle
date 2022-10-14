import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { UpdateWoodcutting } from 'src/app/stateManagement/character/character.actions';
import { PlayerData } from 'src/app/stateManagement/character/CharacterDataTypes';
import { environment } from 'src/environments/environment';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class BuyingService {
  constructor(private httpClient: HttpClient, private toastrService: ToastrService, private store: Store) {}

  baseUrl = environment.apiUrl;

  buyItem(item: Item) {
    this.httpClient.post<{message: string, userData: PlayerData}>(`${this.baseUrl}/shop/buyItem`, item).subscribe(
      (response) => {
        console.log(response);
        this.toastrService.info(response.message);
        this.setPlayerData(response.userData);
      },
      (error) => {
        this.toastrService.error(error.error.message);
      }
    );
  }

  setPlayerData(playerData: any) {
    this.store.dispatch(new UpdateWoodcutting(playerData));
  }

}
