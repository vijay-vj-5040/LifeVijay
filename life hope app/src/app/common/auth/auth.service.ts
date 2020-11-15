import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseLayerService } from '../service/base.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppConfigService } from '../service/app-initializer.service';
import { SpinnerService } from '../service/spinner.service';
import { constants } from 'buffer';
import { map, share } from 'rxjs/operators';


@Injectable()


export class AuthService extends BaseLayerService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loginState = localStorage.getItem("token") != null;
  logoutTimer = null;
  get isLoggedIn() {
    this.loggedIn.next(localStorage.getItem("token") != null)
    return this.loggedIn.asObservable();
  }


  constructor(
    protected router: Router,
    protected http: HttpClient,

    protected spinnerService: SpinnerService,
    protected appConfig: AppConfigService) {
    super('login', http, router, appConfig, spinnerService);
    this.initLogoutTimer();
  }
  initLogoutTimer() {
    if (this.logoutTimer) {
      clearInterval(this.logoutTimer);
    }
    this.logoutTimer = setInterval(() => {
      this.checkAutoLogout();
    }, 500);
  }
  //Logout user automatically on time out
  checkAutoLogout() {
    if (this.loginState) {

      //let minutes = Number.parseInt(localStorage.getItem('tokenExipreTime'));
      let expireTime = new Date(localStorage.getItem('tokenExipreTime'));
      //expireTime.setMinutes(expireTime.getMinutes() + minutes);
      let dateNow = new Date();
 

      if (expireTime < dateNow) {
        this.logout();
      }
      else {
        this.appConfig.SessionTimer = this.getTimeDiffString(dateNow, expireTime);
      }
    }
  }
  getTimeDiffString(dateSrc1: Date, dateSrc2: Date) {
    var date1 = dateSrc1.getTime();
    var date2 = dateSrc2.getTime();
    var duration = date2 - date1;
    var seconds = (duration / 1000);
    var minutes = parseInt((seconds / 60).toString(), 10);
    seconds = seconds % 60;

    var hours = parseInt((minutes / 60).toString(), 10);
    minutes = minutes % 60;
    var nonMsSeconds = parseInt(seconds.toString(), 10);

    if (hours > 0)
      return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + nonMsSeconds.toString().padStart(2, '0');
    else if (minutes > 0)
      return minutes.toString().padStart(2, '0') + ':' + nonMsSeconds.toString().padStart(2, '0');
    else
      return nonMsSeconds.toString().padStart(2, '0');
  }

  logout() {
    this.loginState = false;
    this.loggedIn.next(false);    
    localStorage.clear();
    this.router.navigate(['login']);
  }

  login(data) {
    this.fetchToken(data).subscribe(result => {

      if (result.isOk) {
        this.loginState = true;
        localStorage.setItem("token", 'Bearer ' +result.data.token);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        localStorage.setItem("refreshTokenExipreTime", result.data.refreshExpireTime);
        localStorage.setItem("tokenExipreTime", result.data.expireTime);
        localStorage.setItem("displayName", result.data.displayName);
        this.loggedIn.next(true);
        this.initLogoutTimer();
        this.router.navigate(['dashboard']);
      }

    });

  }
  fetchToken(data): Observable<any> {
    return this.post<any>('login', data);
  }
  getAuthToken() {
    return localStorage.getItem('token');
  }
  initLogout() {
    if (this.logoutTimer) {
      clearInterval(this.logoutTimer);
    }

    this.logoutTimer = setInterval(() => {
      this.checkAutoLogout();
    }, 500)
  }


  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem("refreshToken");
    const token = localStorage.getItem("token");
    
    return this.http.post(this.getUrl(this.apiBase, 'refreshtoken'),
      {
        token: token,
        refreshToken: refreshToken
      }).pipe(
        share(), map((res)=>{
          
        })
      )
      
      
  }
}
