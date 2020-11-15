import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppConfigService } from './app-initializer.service';
import { BaseLayerService } from './base.service';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})


export class DashBoardService extends BaseLayerService {
    constructor(
        protected router: Router,
        protected http: HttpClient,
        protected spinnerService:SpinnerService,
        protected authService:AuthService,
        protected appConfig: AppConfigService) {           
        super('Analyzsis',http,router,appConfig,spinnerService,authService);         
      }

      dashboard():Observable<any>
      {
         return this.get<any>('getDashBoard')
      }
}