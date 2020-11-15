import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service'; 
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
 
  constructor(public authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.loginState) {
      
      request = this.addToken(request, this.authService.getAuthToken());

      return next.handle(request).pipe(catchError(error=>{
        debugger
        if(error instanceof HttpErrorResponse && (error.status ===401 ||error.status===0)){
          
this.handle401Error(request,next);
        }
        else
        {
          return next.handle(request);
        }
      }));

    }
    return next.handle(request);
  
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `${token}`
      }
    });
  }


  
private isRefreshing = false;
private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.refreshToken().subscribe(
      switchMap((token: any) => {
        this.isRefreshing = false;
        
        this.refreshTokenSubject.next(token.jwt);
        return next.handle(this.addToken(request, token.jwt));
      }));

  } else {
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        debugger
        return next.handle(this.addToken(request, jwt));
      }));
  }
}
}