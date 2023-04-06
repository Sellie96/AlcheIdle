import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/utils/toast.service';
import { Store } from '@ngxs/store';
import { CreateCharacter } from 'src/app/state/character.actions';
import { PlayerData } from 'src/app/state/CharacterDataTypes';

@Injectable({
  providedIn: 'root',
})
export class BackpackService {
  baseUrl = environment.apiUrl;

  constructor(private toastr: ToastService, private httpClient: HttpClient, private store: Store) {}

  equipItem(item: any) {
    this.httpClient
      .post<{message: string, player: PlayerData}>(`${this.baseUrl}/character/equipItem`, {
        item: item,
      })
      .subscribe(
        async (response) => {
        (await this.toastr.getSuccessToast(response.message)).present();
        console.log(response.player);
        this.store.dispatch(new CreateCharacter(response.player));
        },
        async (_) => {
          (await this.toastr.getErrorToast()).present();
        }
      );
  }

  unequipItem(type: string) {
    this.httpClient
      .post<{message: string, player: PlayerData}>(`${this.baseUrl}/character/unequipItem`, {
        type: type,
      })
      .subscribe(
        async (response) => {
        (await this.toastr.getSuccessToast(response.message)).present();
        console.log(response);
        this.store.dispatch(new CreateCharacter(response.player));
        },
        async (_) => {
          (await this.toastr.getErrorToast()).present();
        }
      );
  }
}
