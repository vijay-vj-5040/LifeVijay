import { Component } from '@angular/core';
import { AppConfigService } from './common/service/app-initializer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '::life-hope::';
  constructor(public appConfig:AppConfigService){
    this.appConfig.loadConfigOnAppInit();
   console.log (this.appConfig.AppInfo)
  }
}
