import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ChangePasswordComponent } from './user-settings/change-password/change-password.component';
import { AppConfigService } from './common/service/app-initializer.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './common/auth/app.interceptor';
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './common/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotifierComponent } from './notifier/notifier.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule} from '@angular/material/chips';
import { ChartsModule } from 'ng2-charts';
import { AuthGuard } from './common/auth/aut.guards';
import { HeaderProfileComponent } from './common-component/header-profile/header-profile.component';
import { LeftMenuComponent } from './common-component/left-menu/left-menu.component';
import { LifeHopeModule } from "./material.module";
import { DashBoardService } from './common/service/dashboard.service';
import { OrderListComponent } from './order-list/order-list.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { CdkTableModule } from '@angular/cdk/table';
import { ApproveStatusComponent } from './approve-status/approve-status.component';

const appinitialize = (appconfigservice: AppConfigService) => { 
  return () => { return appconfigservice.loadConfigOnAppInit()}
 }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,   
    FooterComponent,
    UserSettingsComponent,
    ChangePasswordComponent,
    DashboardComponent,
    SpinnerComponent,
    NotifierComponent,
    HeaderProfileComponent,
    LeftMenuComponent,
    OrderListComponent,
    ApproveStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  
    ChartsModule,
    LifeHopeModule,
    MatTableModule,
    MatChipsModule,
    RouterModule,
    CdkTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [AppConfigService,AuthService,AuthGuard,DashBoardService
    , { provide: APP_INITIALIZER, useFactory: appinitialize,multi:true,deps:[AppConfigService]},
     {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true, }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],
  exports:[HeaderProfileComponent],
  
})
export class AppModule { }
