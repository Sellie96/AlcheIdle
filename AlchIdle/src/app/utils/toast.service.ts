import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }


  getErrorToast(
    shownMessage: string = "Error",
    duration: number = 1500,
    css: string = "error-toast",
    location: any = "top") {
    return this.toastController.create({
      message: shownMessage,
      duration: duration,
      position: location,
      cssClass: css,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });
  }

  getSuccessToast(
    shownMessage: string = "Success",
    duration: number = 1500,
    css: string = "success-toast",
    location: any = "top") {
    return this.toastController.create({
      message: shownMessage,
      duration: duration,
      position: location,
      cssClass: css,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });
  }

  getWarnToast(
    shownMessage: string = "Warn",
    duration: number = 1500,
    css: string = "warn-toast",
    location: any = "top") {
    return this.toastController.create({
      message: shownMessage,
      duration: duration,
      position: location,
      cssClass: css,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });
  }


  getLootToast(
    shownMessage: string = "Success",
    duration: number = 2000,
    css: string = "loot-toast",
    location: any = "bottom") {
    return this.toastController.create({
      message: shownMessage,
      duration: duration,
      position: location,
      cssClass: css,
      buttons: [],
    });
  }


}
