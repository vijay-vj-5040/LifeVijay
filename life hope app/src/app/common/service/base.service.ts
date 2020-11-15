import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { AuthService } from '../auth/auth.service'; 
import { AppConfigService } from './app-initializer.service';
import { SpinnerService } from './spinner.service';
export class BaseLayerService {
  ErrorMessage;

  private isError = new Subject();
  constructor(
    protected apiBase: string,
    protected http: HttpClient,     
    protected router: Router, 
    protected appConfig:AppConfigService,
    protected spinnerService?: SpinnerService, 
    protected authService?: AuthService,

  ) { }

  protected get<T>(method: string, params?: HttpParams | { [param: string]: string | string[]; }) {
    const callBack = new Observable<T>(cd => { 
      this.http.get<T>(this.getUrl(this.apiBase, method), { params: params }).subscribe(
        response => {
          this.responseOk(response);
          cd.next(response);
          
        },
        error => {
          
          this.responseError(error);
        });
    });
    return callBack;
  }

  protected post<T>(method: string, body: any, params?: HttpParams | { [param: string]: string | string[]; }) {

    const callBack = new Observable<T>(cd => {
      
      this.http.post<T>(this.getUrl(this.apiBase, method), body, { params: params }).subscribe(
        response => {
          this.responseOk(response);
          cd.next(response);
      
        },
        error => {
      
          this.responseError(error);
        });
    });
    return callBack;
  }

  protected put<T>(method: string, body: any, params?: HttpParams | { [param: string]: string | string[]; }) {

    const callBack = new Observable<T>(cd => {
      
      this.http.put<T>(this.getUrl(this.apiBase, method), JSON.stringify(body), { params: params }).subscribe(
        response => {
          this.responseOk(response);
          cd.next(response);
      
        },
        error => {
      
          this.responseError(error);
        });
    });
    return callBack;
  }

  protected delete<T>(method: string, params?: HttpParams | { [param: string]: string | string[]; }) {
    const callBack = new Observable<T>(cd => {
      
      this.http.delete<T>(this.getUrl(this.apiBase, method), { params: params }).subscribe(
        response => {
          this.responseOk(response);
          cd.next(response);
      
        },
        error => {
      
          this.responseError(error);
        });
    });
    return callBack;
  }

  // To show the error message, when reponse bad execution result (user handled exception)
  private responseOk(response: any) {
    return response;
   }

  // To Show the error message, when reponse bad execution result (user unhandled exception)
  private responseError(error: any) {

    if (error.status === 401) {

      this.authService.logout();
    } else if (error.error != null && error.error.isOk === false && error.error.message !== '') {
      //this.notifierInfo.error(error.error.message);
      this.isError.next(error.error.message);
      console.error(error.error.message);
    } else if (error.statusText === 'Unknown Error') { // show message when cannot connect to server
      // this.notifierInfo.error('Server cannot be reached');
      this.isError.next('Server cannot be reached');
      //this.ErrorMessage ='Server cannot be reached';
    } else {
      //  this.notifierInfo.error(error.error.message);
      this.ErrorMessage = error.error.message;
    }
    if (error.status === 400) {    
      debugger   
           this.spinnerService.setResponseMessage({ response: { message: error.error.message }, color: 'warn', status: true });
         
      
    }
    if (error.status === 502) {
      //this.spinnerService.setResponseMessage({ response: { message: error.error.message }, color: 'warn', status: true });
    }
  }

  public getUrl(apiBase: any, method: any) {
  
      return this.appConfig.AppInfo.APIURL+'/api/' + apiBase +'/'+method;
   
    
  }
 

  public getError() {

    return this.isError.asObservable();
  }
}
