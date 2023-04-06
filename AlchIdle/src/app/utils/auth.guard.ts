import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account/Account.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService, 
    private toastr: ToastService, 
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    if (!this.accountService.getIsAuth()) {
      this.router.navigate(['/']);
      this.toastr.getErrorToast('You must be logged in to access this page.');
      return false;
    }
    return true;
  }
}
