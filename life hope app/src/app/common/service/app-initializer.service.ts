import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private applicationInfo; 
  private sessionTimer;

  constructor(private injector: Injector) { }

   

  loadConfigOnAppInit() {
    const http = this.injector.get(HttpClient);  

    return  http.get('./assets/config/app-config.json').toPromise().then(data => {
      this.applicationInfo = data;
      
    });

     
     
     


  }


  get SessionTimer(){
    return this.sessionTimer;
  }

  set SessionTimer(value:string){
    this.sessionTimer =value;
  }

  get AppInfo() {
    
    return this.applicationInfo;
  }
}
