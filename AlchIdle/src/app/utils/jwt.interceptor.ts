import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../account/Account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  // Constant for the 'Bearer' keyword in the 'Authorization' header
  private readonly bearer = 'Bearer';

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the auth token from the account service
    const authToken = this.accountService.getToken();

    // Check if the token is not null or undefined
    if (authToken) {
      // Set the 'Authorization' header on the original request object
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `${this.bearer} ${authToken}`)
      });

      // Pass the updated request object to the next handler
      return next.handle(authRequest);
    }

    // If the token is null or undefined, return the original request
    return next.handle(request);
  }
}