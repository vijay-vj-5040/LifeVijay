import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveStatusComponent } from './approve-status/approve-status.component';
import { AuthGuard } from './common/auth/aut.guards';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
  { path: 'order-list', component: OrderListComponent,canActivate:[AuthGuard] },
  { path: 'approve-status', component: ApproveStatusComponent,canActivate:[AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
